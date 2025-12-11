# Troubleshooting Guide

This guide helps resolve common issues when setting up and customizing the campaign website template.

## Quick Diagnosis

### Is your issue related to...
- **[Setup & Configuration](#setup--configuration-issues)** - Environment variables, dependencies, initial setup
- **[Build & Deployment](#build--deployment-issues)** - Compilation errors, deployment failures
- **[Content & Customization](#content--customization-issues)** - Template placeholders, styling, content updates
- **[Infrastructure & Docker](#infrastructure--docker-issues)** - Container problems, networking, SSL certificates
- **[Performance & Loading](#performance--loading-issues)** - Slow loading, memory issues, optimization

---

## Setup & Configuration Issues

### Environment Variables Not Working

**Symptoms:**
- Placeholder text like `[CANDIDATE_NAME]` appearing on the website
- Build warnings about missing environment variables
- Features not working as expected

**Solutions:**

1. **Check file naming and location**
   ```bash
   # For NextJS app (client-side variables)
   src/web/.env.local          # Development
   src/web/.env.production     # Production

   # For Docker deployment (server-side)
   .env                        # Root directory
   ```

2. **Verify environment variable format**
   ```bash
   # ✅ Correct format
   NEXT_PUBLIC_CANDIDATE_NAME="Jane Smith"
   CANDIDATE_POSITION="City Council Ward 3"

   # ❌ Common mistakes
   NEXT_PUBLIC_CANDIDATE_NAME=Jane Smith  # Missing quotes with spaces
   CANDIDATE_NAME="Jane Smith"            # Missing NEXT_PUBLIC_ prefix for client variables
   ```

3. **Restart development server**
   ```bash
   # Changes to environment variables require restart
   npm run dev  # Stop with Ctrl+C first, then restart
   ```

4. **Check environment variable loading**
   ```typescript
   // Add to component for debugging
   console.log('Campaign config:', getCampaignConfig());
   ```

### Dependencies Installation Problems

**Symptoms:**
- `npm install` fails with errors
- Missing module errors
- Version conflicts

**Solutions:**

1. **Clear cache and reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

2. **Check Node.js version**
   ```bash
   node --version  # Should be 18+ 
   npm --version   # Should be 8+
   ```

3. **Use exact versions**
   ```bash
   # If having version conflicts
   npm install --exact
   ```

---

## Build & Deployment Issues

### NextJS Build Failures

**Common Error: "'use client' directive must be placed before other expressions"**
```typescript
// ❌ Incorrect order
import React from 'react';
'use client';

// ✅ Correct order  
'use client';
import React from 'react';
```

**Common Error: "Cannot read properties of undefined"**
```typescript
// ❌ Accessing undefined properties
<h1>{campaign.candidateName}</h1>  // If getCampaignConfig() fails

// ✅ Safe access with fallbacks
<h1>{campaign?.candidateName || '[CANDIDATE_NAME]'}</h1>
```

**Common Error: TypeScript compilation errors**
```bash
# Check for TypeScript errors
npm run type-check

# Common fixes:
# 1. Add missing type definitions
# 2. Fix import paths
# 3. Add proper interfaces for props
```

### Docker Deployment Issues

**Container won't start**
```bash
# Check container logs
docker compose logs campaign
docker compose logs traefik

# Common issues:
# 1. Missing environment variables
# 2. Port conflicts
# 3. Network issues
```

**SSL Certificate Problems**
```bash
# Check certificate generation
docker compose logs traefik | grep -i acme
docker compose logs traefik | grep -i certificate

# Force certificate renewal
docker compose restart traefik
```

**Basic Authentication Not Working**
```bash
# Generate password hash correctly
htpasswd -nb username password

# Example output: username:$apr1$xyz$hashedpassword
# Add to BASIC_AUTH_USERS environment variable
```

### Cloudflare Pages Deployment

**Build Fails on Cloudflare**
```bash
# Check build settings in Cloudflare Pages dashboard:
# Build command: cd src/web && npm install && npm run build
# Build output directory: src/web/out
# Node version: 18.x
```

**Environment Variables Not Set**
- Go to Cloudflare Pages dashboard → Settings → Environment Variables
- Add all variables from `.env.template`
- Redeploy after adding variables

---

## Content & Customization Issues

### Template Placeholders Still Showing

**Issue:** Seeing `[CANDIDATE_NAME]` or `[POSITION]` on live site

**Causes & Solutions:**

1. **Environment variables not set properly**
   - Check `.env.local` file exists and has correct values
   - Ensure NEXT_PUBLIC_ prefix for client-side variables

2. **Caching issues**
   ```bash
   # Clear NextJS cache
   rm -rf .next
   npm run build
   ```

3. **Static site generation**
   ```bash
   # For static exports, ensure environment variables are available at build time
   npm run build
   npm run export
   ```

### Styling Issues

**Tailwind CSS not working**
```bash
# Check if Tailwind is properly configured
npm run dev  # Should show Tailwind compilation

# Common fixes:
# 1. Check tailwind.config.js includes all content paths
# 2. Verify @tailwind directives in globals.css
# 3. Clear browser cache
```

**Custom colors not applying**
```css
/* Check CSS variables in globals.css */
:root {
  --primary: 210 100% 56%;      /* Blue */
  --secondary: 195 100% 50%;    /* Light blue */
}

/* Use in Tailwind classes */
.bg-primary    /* Uses var(--primary) */
```

**Images not loading**
```typescript
// Check image paths and optimization
import Image from 'next/image';

<Image
  src="/images/candidate-profile.jpg"  // Must be in public/images/
  alt="Candidate photo"
  width={400}
  height={400}
/>
```

### Dynamic Content Issues

**Social media links not working**
```typescript
// Check social media configuration
const campaign = getCampaignConfig();
console.log(campaign.social); // Debug social media config

// Ensure proper URL format
NEXT_PUBLIC_TWITTER_HANDLE="@username"      // Include @
NEXT_PUBLIC_FACEBOOK_PAGE="facebook.com/page"  // Without https://
```

---

## Infrastructure & Docker Issues

### Container Networking Problems

**Containers can't communicate**
```bash
# Check network creation
docker network ls | grep campaign

# Recreate network if needed
docker network rm campaignnet
docker network create campaignnet
```

**Port conflicts**
```bash
# Check what's using ports 80/443
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Stop conflicting services
sudo systemctl stop apache2  # or nginx
```

### Traefik Configuration Issues

**Dashboard not accessible**
```bash
# Check Traefik labels and routing
docker compose config  # Verify configuration

# Common issues:
# 1. Domain not pointing to server
# 2. Basic auth not configured
# 3. SSL certificate issues
```

**SSL certificates not generating**
```bash
# Check ACME challenge logs
docker compose logs traefik | grep -i acme

# Common fixes:
# 1. Verify domain DNS points to server
# 2. Check Let's Encrypt rate limits
# 3. Ensure ports 80/443 are open
# 4. Verify email is set in LETS_ENCRYPT_EMAIL
```

### Volume and Persistence Issues

**Data not persisting**
```bash
# Check volume mounts
docker compose config | grep -A5 volumes

# Common issues:
# 1. Incorrect volume paths
# 2. Permission issues
# 3. SELinux blocking access (on RHEL/CentOS)
```

---

## Performance & Loading Issues

### Slow Build Times

**Solutions:**
```bash
# Use build cache
npm run build  # Should reuse cache on subsequent builds

# Analyze bundle size
npm run analyze  # If configured

# Optimize dependencies
npm audit fix
npm outdated
```

### Large Bundle Sizes

**Check bundle analysis**
```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze build
npm run analyze
```

**Common optimizations:**
- Use dynamic imports for large components
- Optimize images (WebP format)
- Remove unused dependencies
- Use tree shaking

### Runtime Performance Issues

**Memory usage issues**
```bash
# Monitor container resources
docker stats

# Increase container memory if needed
# Add to docker-compose.yml:
services:
  campaign:
    deploy:
      resources:
        limits:
          memory: 1G
```

---

## Platform-Specific Issues

### GitHub Pages

**Site not updating after push**
- Check GitHub Actions workflow status
- Verify Pages is configured to use GitHub Actions
- Check repository Settings → Pages configuration

**404 errors on page routes**
```javascript
// Add to next.config.js for static export
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/repository-name' : '',
}
```

### Vercel Deployment

**Environment variables not working**
- Set environment variables in Vercel dashboard
- Ensure proper prefixes (NEXT_PUBLIC_ for client-side)
- Redeploy after changing environment variables

**Build timeouts**
- Optimize build process
- Remove unnecessary dependencies
- Use Vercel Pro for longer build times

### Self-Hosted VPS Issues

**Server resource problems**
```bash
# Check system resources
free -h      # Memory usage
df -h        # Disk usage
top          # CPU usage

# Monitor Docker resources
docker system df  # Docker disk usage
docker system prune  # Clean up unused data
```

**Firewall issues**
```bash
# Check firewall status
sudo ufw status

# Open required ports
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22  # SSH
```

---

## Getting Additional Help

### Debug Information to Collect

When reporting issues, include:

1. **Environment Information**
   ```bash
   node --version
   npm --version
   docker --version
   docker compose version
   ```

2. **Error Logs**
   ```bash
   # NextJS build errors
   npm run build 2>&1 | tee build.log

   # Docker container logs
   docker compose logs > docker.log

   # System logs (if relevant)
   sudo journalctl -u docker > system.log
   ```

3. **Configuration Files**
   - Sanitized environment variables (remove secrets)
   - Docker compose configuration
   - NextJS configuration files

### Support Channels

1. **GitHub Issues** - Bug reports and feature requests
2. **GitHub Discussions** - Questions and community help
3. **Documentation** - Check all documentation files first:
   - `README.md` - Overview and quick start
   - `TEMPLATE_CUSTOMIZATION.md` - Detailed customization
   - `DEPLOYMENT.md` - Deployment instructions
   - `DEVELOPMENT.md` - Development workflow

### Emergency Fixes

**Site is completely broken:**
1. Revert to last working commit
2. Check environment variables are set
3. Clear all caches (browser, build, Docker)
4. Restart all services

**Quick rollback:**
```bash
# Git rollback
git log --oneline -5  # Find last good commit
git reset --hard <commit-hash>

# Docker rollback
docker compose down
docker compose up -d
```

Remember: When in doubt, start with the basics - check environment variables, restart services, and clear caches. Most issues are configuration-related and can be resolved by following the setup instructions carefully.