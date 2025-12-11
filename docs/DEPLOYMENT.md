# Deployment Guide

This guide covers all deployment options for the campaign website template, from local development to production hosting.

## Deployment Options Overview

| Method | Cost | Complexity | Features | Best For |
|--------|------|------------|----------|----------|
| **Docker** | Server costs | Medium | Full stack, HTTPS, dev env | Self-hosted, full control |
| **Cloudflare Pages** | Free tier available | Low | Global CDN, excellent performance | High-traffic campaigns |
| **GitHub Pages** | Free | Very Low | Simple hosting | Small campaigns, basic needs |
| **Vercel** | Free tier available | Low | Auto-deploy, edge functions | Modern hosting |
| **Netlify** | Free tier available | Low | Form handling, edge functions | JAMstack deployment |

## Prerequisites

### General Requirements
- Git repository with your customized campaign website
- Domain name (recommended for production)
- SSL certificate (automatically handled by most platforms)

### Platform-Specific Requirements
- **Docker**: Docker and Docker Compose installed
- **Cloudflare**: Cloudflare account and API token
- **GitHub Pages**: GitHub account and repository
- **Vercel/Netlify**: Account on respective platform

## Method 1: Docker Deployment (Recommended for Full Control)

### Features
- Complete infrastructure stack
- Automatic HTTPS with Let's Encrypt
- Development environment with code-server
- Basic authentication for staging
- Traefik reverse proxy

### Prerequisites
```bash
# Install Docker and Docker Compose
# Ubuntu/Debian:
sudo apt update
sudo apt install docker.io docker-compose-plugin

# CentOS/RHEL:
sudo yum install docker docker-compose

# macOS:
# Install Docker Desktop from docker.com

# Windows:
# Install Docker Desktop from docker.com
```

### Setup Process

#### 1. Server Preparation
```bash
# For VPS/Cloud server deployment
# Ensure ports 80 and 443 are open
sudo ufw allow 80
sudo ufw allow 443

# Add user to docker group
sudo usermod -aG docker $USER
# Log out and back in for group changes to take effect
```

#### 2. Configuration
```bash
# Clone your repository
git clone https://github.com/yourusername/your-campaign-repo
cd your-campaign-repo

# Copy and configure environment
cp .env.template .env

# Edit .env with your settings
nano .env
```

Required environment variables for Docker:
```bash
# Domain configuration
CAMPAIGN_DOMAIN="yourcampaign.com"
DUCKDNS_DOMAIN_NAME="yourcampaign"  # If using DuckDNS

# SSL configuration
LETS_ENCRYPT_EMAIL="admin@yourcampaign.com"

# Basic auth for staging (optional)
BASIC_AUTH_USERS="admin:$apr1$xyz$hashedpassword"

# External service tokens
DUCKDNS_TOKEN="your-duckdns-token"  # If using DuckDNS for DNS
```

#### 3. DNS Configuration
```bash
# Point your domain to your server
# A record: @ -> YOUR_SERVER_IP
# A record: www -> YOUR_SERVER_IP
# A record: *.yourcampaign.com -> YOUR_SERVER_IP (for subdomains)
```

#### 4. Deployment
```bash
# Deploy the full stack
docker compose up -d

# Check logs
docker compose logs -f

# Verify containers are running
docker compose ps
```

#### 5. Access Your Sites
- **Main website**: https://yourcampaign.com
- **Development environment**: https://code.yourcampaign.com
- **Traefik dashboard**: https://traefik.yourcampaign.com

### Docker Troubleshooting

#### Check Container Status
```bash
docker compose ps
docker compose logs campaign
docker compose logs traefik
```

#### Certificate Issues
```bash
# Check Let's Encrypt certificates
docker compose exec traefik ls -la /certs/

# Force certificate renewal
docker compose restart traefik
```

#### Update Deployment
```bash
# Pull latest changes
git pull

# Rebuild and redeploy
docker compose down
docker compose up -d --build
```

## Method 2: Cloudflare Pages

### Features
- Global CDN with excellent performance
- Automatic deployments from Git
- Free tier with generous limits
- Built-in analytics and security

### Setup Process

#### 1. Cloudflare Account Setup
1. Create account at [cloudflare.com](https://cloudflare.com)
2. Add your domain to Cloudflare
3. Update nameservers with your domain registrar
4. Generate API token with Pages permissions

#### 2. Local Configuration
```bash
cd src/cloudflare-deploy

# Install Wrangler CLI
npm install -g wrangler

# Configure authentication
wrangler login

# Set up environment
cp .env.template .env
nano .env
```

Required environment variables:
```bash
CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CANDIDATE_NAME="Your Name"
CAMPAIGN_DOMAIN="yourcampaign.com"
# ... other campaign variables
```

#### 3. Deploy
```bash
# Install dependencies
npm install

# Build the site
npm run build

# Deploy to Cloudflare Pages
npm run deploy

# Or set up automatic deployments from Git
wrangler pages project create your-campaign
```

#### 4. Custom Domain Setup
```bash
# Add custom domain in Cloudflare Pages dashboard
# Or via CLI:
wrangler pages deployment tail --project-name=your-campaign
```

### Cloudflare Pages Environment Variables
Configure in the Cloudflare Pages dashboard:
- Go to your project → Settings → Environment Variables
- Add all variables from your `.env.template`
- Deploy to apply changes

## Method 3: GitHub Pages

### Features
- Free hosting directly from GitHub
- Simple setup and deployment
- Automatic builds with GitHub Actions
- Custom domain support

### Setup Process

#### 1. Repository Setup
```bash
# Fork the template repository
# Or push your customized code to a new GitHub repository

# Ensure your repository is public (required for free GitHub Pages)
```

#### 2. Configure GitHub Actions
The repository includes a GitHub Actions workflow (`.github/workflows/nextjs.yml`). 

Update the workflow file if needed:
```yaml
# .github/workflows/nextjs.yml
name: Deploy Next.js site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      # Add your build steps
```

#### 3. Environment Variables
Add secrets in GitHub repository settings:
- Go to Settings → Secrets and Variables → Actions
- Add environment variables as repository secrets

#### 4. Enable GitHub Pages
1. Go to repository Settings → Pages
2. Select "GitHub Actions" as source
3. Configure custom domain (optional)

#### 5. Deploy
- Push changes to the `main` branch
- GitHub Actions will automatically build and deploy
- Site will be available at `https://yourusername.github.io/repository-name`

## Method 4: Vercel Deployment

### Setup Process
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from your project directory
cd src/web
vercel

# Follow the prompts to configure your project
```

### Environment Variables
Configure in Vercel dashboard or via CLI:
```bash
vercel env add CANDIDATE_NAME
vercel env add CAMPAIGN_EMAIL
# Add all other environment variables
```

## Method 5: Netlify Deployment

### Setup Process
1. Connect your Git repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out` (for static export)
3. Add environment variables in site settings

### Netlify Configuration
Create `netlify.toml` in project root:
```toml
[build]
  command = "cd src/web && npm install && npm run build"
  publish = "src/web/out"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Production Checklist

### Before Deployment
- [ ] All environment variables configured
- [ ] Placeholder content replaced
- [ ] Images optimized and uploaded
- [ ] Contact forms tested
- [ ] Analytics configured
- [ ] SEO metadata complete
- [ ] Performance testing completed

### Security Checklist
- [ ] SSL certificates configured
- [ ] Environment variables secured
- [ ] No sensitive data in repository
- [ ] Authentication configured for staging
- [ ] Regular security updates planned

### Post-Deployment
- [ ] Domain DNS propagated
- [ ] SSL certificates working
- [ ] All pages loading correctly
- [ ] Forms submitting successfully
- [ ] Analytics tracking correctly
- [ ] Mobile responsiveness verified
- [ ] Performance optimization complete

## Monitoring and Maintenance

### Performance Monitoring
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Set up uptime monitoring
- Review analytics regularly

### Security Updates
- Keep dependencies updated
- Monitor for security vulnerabilities
- Regular certificate renewal checks
- Review access logs

### Content Updates
- Regular content reviews
- Event calendar updates
- News and blog post additions
- Contact information verification

## Troubleshooting Common Issues

### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### SSL Certificate Issues
- Verify DNS is pointing correctly
- Check certificate expiration dates
- Ensure ports 80 and 443 are accessible

### Performance Issues
- Optimize images (use WebP format)
- Enable compression
- Use CDN for static assets
- Minimize JavaScript bundles

### Form Submission Issues
- Verify email service configuration
- Check CORS settings
- Test with different email providers
- Review server logs for errors

## Advanced Configuration

### Custom Domain with SSL
Most platforms handle SSL automatically, but for custom setups:
```bash
# Generate SSL certificate with certbot
sudo certbot --nginx -d yourcampaign.com -d www.yourcampaign.com
```

### CDN Configuration
For improved performance:
- Enable CDN on your hosting platform
- Configure caching headers
- Optimize asset delivery
- Use appropriate cache policies

### Database Integration
For advanced features requiring a database:
- Consider serverless databases (PlanetScale, Supabase)
- Set up connection pooling
- Implement proper backup strategies
- Configure monitoring and alerts

Remember to test thoroughly in a staging environment before deploying to production!