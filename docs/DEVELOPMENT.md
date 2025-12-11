# Development Guide

This guide covers the development workflow, code structure, and contribution guidelines for the campaign website template.

## Development Environment Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/campaign-infra
   cd campaign-infra
   ```

2. **Set up the web application**
   ```bash
   cd src/web
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.template .env.local
   # Edit .env.local with your development values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   - Navigate to http://localhost:3000
   - The site will auto-reload on changes

## Project Structure

```
src/web/
├── app/                    # Next.js App Router
│   ├── components/        # Reusable React components
│   ├── lib/              # Utility functions and configuration
│   ├── globals.css       # Global styles and Tailwind CSS
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Homepage
├── public/               # Static assets
│   ├── images/          # Campaign photos and graphics
│   └── icons/           # Favicons and app icons
├── package.json         # Dependencies and scripts
└── tailwind.config.js   # Tailwind CSS configuration
```

### Key Files and Components

#### Configuration (`app/lib/utils.ts`)
- `getCampaignConfig()` - Central configuration function
- `assetUrl()` - Helper for asset paths
- Environment variable management

#### Core Components
- `Hero.tsx` - Main hero section
- `Navigation.tsx` - Site navigation
- `Footer.tsx` - Site footer
- `NewsletterSignup.tsx` - Email signup form

#### Pages
- `page.tsx` - Homepage
- `about/page.tsx` - Candidate biography
- `platform/page.tsx` - Policy positions
- `faq/page.tsx` - Frequently asked questions
- `contact/page.tsx` - Contact form
- `get-involved/page.tsx` - Volunteer opportunities

## Customization Guidelines

### Environment Variables
All dynamic content should use environment variables through `getCampaignConfig()`:

```typescript
// ✅ Good - Uses configuration
const campaign = getCampaignConfig();
<h1>{campaign.candidateName}</h1>

// ❌ Bad - Hardcoded content
<h1>Jane Smith</h1>
```

### Content Templates
Use template comments for content that should be customized:

```typescript
{/* TODO: Replace with candidate's background story */}
<p>
  For over [X] years, {campaign.candidateName} has been a dedicated public servant...
</p>
```

### Styling Guidelines
- Use Tailwind CSS classes for styling
- Follow the established design system
- Use CSS variables for theme colors
- Ensure responsive design (mobile-first)

## Development Workflow

### Branch Strategy
- `main` - Production branch
- `develop` - Development branch
- Feature branches: `feature/description`
- Bug fixes: `fix/description`

### Code Quality
1. **Linting**
   ```bash
   npm run lint
   npm run lint:fix
   ```

2. **Type Checking**
   ```bash
   npm run type-check
   ```

3. **Build Testing**
   ```bash
   npm run build
   ```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Component Development

### Creating New Components

1. **Create component file**
   ```typescript
   // app/components/NewComponent.tsx
   'use client';
   
   import { getCampaignConfig } from '../lib/utils';
   
   interface NewComponentProps {
     className?: string;
   }
   
   export default function NewComponent({ className = '' }: NewComponentProps) {
     const campaign = getCampaignConfig();
     
     return (
       <div className={`new-component ${className}`}>
         {/* Component content */}
       </div>
     );
   }
   ```

2. **Add component styles** (if needed)
   ```css
   /* app/globals.css */
   .new-component {
     @apply /* Tailwind classes */;
   }
   ```

3. **Export from index** (if creating a component library)
   ```typescript
   // app/components/index.ts
   export { default as NewComponent } from './NewComponent';
   ```

### Component Guidelines
- Use TypeScript for all components
- Props should have TypeScript interfaces
- Use `getCampaignConfig()` for dynamic content
- Follow existing naming conventions
- Include accessibility attributes
- Ensure responsive design

## Styling System

### Tailwind Configuration
The project uses a custom Tailwind configuration with campaign-specific colors:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        // ... other colors
      }
    }
  }
}
```

### CSS Variables
Define theme colors in `globals.css`:

```css
:root {
  --primary: 210 100% 56%;
  --secondary: 195 100% 50%;
  --accent: 215 20% 65%;
}
```

### Design System Classes
Use consistent utility classes defined in `globals.css`:

```css
.btn-primary { /* Primary button styles */ }
.btn-secondary { /* Secondary button styles */ }
.section-title { /* Section heading styles */ }
.container-custom { /* Container styles */ }
```

## API Development

### Creating API Routes
```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Process form submission
    // Send email, save to database, etc.
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
```

### Environment Variables for APIs
Store sensitive API keys as server-side environment variables:

```bash
# .env.local (server-side only)
SENDGRID_API_KEY=your_key_here
MAILCHIMP_API_KEY=your_key_here

# Use NEXT_PUBLIC_ prefix only for client-side variables
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
```

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/images/candidate-photo.jpg"
  alt={`${campaign.candidateName} campaign photo`}
  width={400}
  height={400}
  priority // For above-the-fold images
  placeholder="blur" // Optional blur placeholder
/>
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run analyze

# Check for unused dependencies
npm run depcheck
```

### Core Web Vitals
Monitor and optimize for:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

## Deployment

### Build Process
```bash
# Production build
npm run build

# Start production server
npm start

# Export static site (for GitHub Pages)
npm run export
```

### Environment-Specific Builds
- Development: `npm run dev`
- Staging: `npm run build && npm start`
- Production: Use hosting platform's build commands

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check TypeScript errors: `npm run type-check`
   - Verify environment variables are set
   - Clear build cache: `rm -rf .next`

2. **Styling Issues**
   - Check Tailwind CSS compilation
   - Verify CSS variable definitions
   - Test responsive breakpoints

3. **Component Errors**
   - Ensure 'use client' directive for client components
   - Check import paths
   - Verify props interfaces

### Debug Mode
```bash
# Enable debug logging
DEBUG=true npm run dev

# Verbose build output
npm run build -- --debug
```

## Contributing

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Make changes following guidelines
4. Test thoroughly
5. Submit pull request with clear description

### Code Review Checklist
- [ ] TypeScript compilation passes
- [ ] All tests pass
- [ ] Linting passes
- [ ] Responsive design tested
- [ ] Accessibility tested
- [ ] Performance impact considered
- [ ] Documentation updated

### Commit Message Format
```
type(scope): description

feat(auth): add login functionality
fix(nav): correct mobile menu behavior
docs(readme): update installation instructions
```

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Tools
- [VS Code Extensions](https://code.visualstudio.com/docs/languages/typescript)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [React Developer Tools](https://react.dev/learn/react-developer-tools)

### Accessibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

## Getting Help

If you encounter issues:
1. Check this documentation
2. Search existing GitHub issues
3. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Node version, etc.)

For questions about customization or deployment, refer to:
- `TEMPLATE_CUSTOMIZATION.md`
- `DEPLOYMENT.md`
- GitHub Discussions