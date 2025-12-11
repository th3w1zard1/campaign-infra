# Campaign Website Infrastructure Template

A comprehensive, production-ready campaign website template built with modern web technologies and deployment automation. This template provides everything needed to launch a professional political campaign website with minimal configuration.

## Overview

This repository contains a complete campaign website infrastructure stack featuring:

### 🌐 **Modern Campaign Website**
- **Next.js 15** with TypeScript for optimal performance and SEO
- **Tailwind CSS v3** for responsive, accessible design
- **Pre-built campaign pages**: Home, About, Platform, Issues, FAQ, Contact, Donate, Get Involved, Media Gallery
- **Mobile-first responsive design** optimized for all devices
- **Dark/light theme support** with system preference detection
- **Component-based architecture** for easy customization

### 🚀 **Production Infrastructure**
- **Docker containerization** for consistent deployments
- **Traefik reverse proxy** with automatic HTTPS via Let's Encrypt
- **Multi-deployment support**: Local Docker, Cloudflare Pages, GitHub Pages
- **Development environment** with hot-reload code server
- **Basic authentication** for staging/development protection

### 🔧 **Developer Experience**
- **TypeScript** for type safety and better development experience
- **ESLint & Prettier** for code quality and consistency
- **Automated deployments** via GitHub Actions
- **Environment-based configuration** for easy customization
- **Comprehensive documentation** for easy adoption

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v3, CSS Variables for theming
- **Infrastructure**: Docker, Traefik, Let's Encrypt
- **Deployment**: Cloudflare Pages, GitHub Pages, Docker Compose
- **Development**: VS Code Server, Hot Module Replacement

## Quick Start

Choose your preferred deployment method:

### 🐳 Method 1: Docker (Recommended)
Perfect for full-featured deployments with HTTPS, development environment, and staging protection.

```bash
# 1. Clone the repository
git clone https://github.com/th3w1zard1/campaign-infra
cd campaign-infra

# 2. Configure environment variables
cp .env.template .env
# Edit .env with your campaign details

# 3. Deploy the full stack
docker compose up -d
```

### ☁️ Method 2: Cloudflare Pages
Ideal for high-performance, globally distributed deployments.

```bash
# 1. Clone and setup
git clone https://github.com/th3w1zard1/campaign-infra
cd campaign-infra/src/cloudflare-deploy

# 2. Install dependencies and configure
npm install
cp .env.template .env
# Add your CLOUDFLARE_API_TOKEN and customize variables

# 3. Deploy
npm run build
npm run deploy
```

### 📄 Method 3: GitHub Pages
Simple, free hosting directly from your repository.

```bash
# 1. Fork this repository to your GitHub account
# 2. Enable GitHub Pages in repository settings
# 3. Configure environment variables in GitHub Secrets
# 4. Push changes to trigger automatic deployment
```

## Project Structure

```
campaign-infra/
├── src/
│   ├── web/                    # Next.js campaign website
│   │   ├── app/               # App router pages and components
│   │   ├── public/            # Static assets (images, icons)
│   │   └── package.json       # Dependencies and scripts
│   └── cloudflare-deploy/     # Cloudflare deployment scripts
├── configs/                   # Infrastructure configurations
│   ├── traefik/              # Reverse proxy and SSL config
│   └── code-server/          # Development environment config
├── docker-compose.yml         # Multi-container orchestration
├── .env.template             # Environment variable template
└── docs/                     # Additional documentation
```

## Requirements

### For Docker Deployment
- **Docker** (version 20.10+)
- **Docker Compose** (version 2.0+)
- **Domain name** (for production deployments)

### For Cloudflare Pages Deployment
- **Node.js** (version 18 or later)
- **npm** (included with Node.js)
- **Cloudflare account** with Pages and Workers enabled
- **Cloudflare API token** with appropriate permissions

### For GitHub Pages Deployment
- **GitHub account** with Pages enabled
- **Custom domain** (optional, for professional branding)

### For Local Development
- **Node.js** (version 18 or later)
- **npm** or **yarn** package manager
- **Git** for version control

## Environment Configuration

This template uses environment variables for easy customization. Copy `.env.template` to `.env` and configure:

### Required Variables
```bash
# Candidate Information
CANDIDATE_NAME="Your Name"
CANDIDATE_POSITION="City Council Ward 1"
CANDIDATE_ELECTION_YEAR="2024"
CAMPAIGN_DOMAIN="yourcampaign.com"

# Contact Information
CAMPAIGN_EMAIL="info@yourcampaign.com"
CAMPAIGN_PHONE="(555) 123-4567"
CAMPAIGN_ADDRESS="123 Main St, Your City, State 12345"

# Social Media
TWITTER_HANDLE="@yourcampaign"
FACEBOOK_PAGE="facebook.com/yourcampaign"
INSTAGRAM_HANDLE="@yourcampaign"
```

### Optional Variables
```bash
# Deployment Configuration
CLOUDFLARE_API_TOKEN="your-cloudflare-token"
DUCKDNS_TOKEN="your-duckdns-token"
LETS_ENCRYPT_EMAIL="admin@yourcampaign.com"

# Analytics and Tracking
GOOGLE_ANALYTICS_ID="GA-XXXXXXXXX"
FACEBOOK_PIXEL_ID="123456789"

# Email Marketing
SENDGRID_API_KEY="your-sendgrid-key"
MAILCHIMP_API_KEY="your-mailchimp-key"
```

## Features

### 🎨 **Professional Campaign Design**
- Modern, accessible design following campaign best practices
- Responsive layout optimized for mobile, tablet, and desktop
- High-contrast color scheme ensuring readability
- Typography optimized for political content and calls-to-action

### 📱 **Complete Page Set**
- **Homepage**: Hero section, key issues, recent news, donation CTA
- **About**: Candidate biography, experience, personal story
- **Platform**: Detailed policy positions and vision
- **Issues**: Key campaign issues with actionable solutions
- **FAQ**: Common questions about the candidate and positions
- **Get Involved**: Volunteer opportunities, endorsements, events
- **Contact**: Contact form, office information, social media
- **Donate**: Secure donation processing with various contribution levels
- **Media**: Photo gallery, press releases, campaign videos

### 🔧 **Built-in Functionality**
- Contact form with email integration
- Newsletter signup with email marketing integration
- Event calendar with RSVP functionality
- Volunteer registration and management
- Social media integration and sharing
- SEO optimization with meta tags and structured data
- Analytics integration for campaign tracking

### 🛡️ **Security & Performance**
- HTTPS encryption with automatic certificate renewal
- Basic authentication for staging environments
- Static site generation for optimal loading speeds
- Image optimization and lazy loading
- Content Security Policy headers
- GDPR-compliant privacy controls

## Customization

### Content Customization
1. **Update candidate information** in `.env` file
2. **Replace placeholder images** in `src/web/public/images/`
3. **Modify campaign colors** in `src/web/app/globals.css`
4. **Edit page content** in respective files under `src/web/app/`
5. **Configure social media links** in component files

### Design Customization
- **Colors**: Modify CSS variables in `globals.css`
- **Typography**: Update font imports and Tailwind configuration
- **Layout**: Adjust component layouts in `src/web/app/components/`
- **Images**: Replace stock photos with campaign photography

### Functionality Extension
- **Add new pages**: Create new files in `src/web/app/`
- **Extend components**: Modify existing components or create new ones
- **Integrate services**: Add email marketing, CRM, or donation platforms
- **Analytics**: Configure Google Analytics, Facebook Pixel, or other tracking

## Development Workflow

### Local Development
```bash
cd src/web
npm install
npm run dev
```

### Code Quality
```bash
npm run lint    # Check code quality
npm run build   # Test production build
npm run type-check  # Verify TypeScript
```

### Remote Development
Access the included code-server environment:
```bash
docker compose up -d
# Visit https://code.yourdomain.com (with basic auth)
```

## Deployment Options

### Production Deployment
For production deployments, this template supports multiple hosting platforms:

1. **Self-hosted with Docker**: Full control, complete feature set
2. **Cloudflare Pages**: Global CDN, excellent performance, generous free tier
3. **GitHub Pages**: Simple, free hosting for basic campaigns
4. **Vercel/Netlify**: Modern hosting with built-in CI/CD

### Environment-Specific Configuration
- **Development**: Local development with hot reloading
- **Staging**: Password-protected preview environment
- **Production**: Optimized build with CDN distribution

## Support and Documentation

### Additional Documentation
- [`TEMPLATE_CUSTOMIZATION.md`](docs/TEMPLATE_CUSTOMIZATION.md) - Step-by-step customization guide
- [`DEPLOYMENT.md`](docs/DEPLOYMENT.md) - Detailed deployment instructions
- [`DEVELOPMENT.md`](docs/DEVELOPMENT.md) - Development workflow and contribution guide
- [`TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) - Common issues and solutions

### Getting Help
- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Ask questions in GitHub Discussions
- **Documentation**: Comprehensive guides in the `docs/` directory

### Contributing
Contributions are welcome! Please read the contribution guidelines in `DEVELOPMENT.md` before submitting pull requests.

## License

This project is released under the MIT License. You are free to use, modify, and distribute this template for any political campaign or similar purpose. See the [LICENSE.txt](LICENSE.txt) file for details.

**Disclaimer**: This template is provided as-is without warranty. Users are responsible for ensuring compliance with campaign finance laws, accessibility requirements, and privacy regulations in their jurisdiction.

## Acknowledgments

This template was created to democratize access to professional campaign website infrastructure. Special thanks to the open-source community for the tools and libraries that make this possible.

---

**Ready to launch your campaign?** Start with the Quick Start guide above, then dive into the detailed customization documentation in the `docs/` folder. 
