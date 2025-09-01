# Template Customization Guide

This guide walks you through customizing the campaign website template for your specific candidate and campaign.

## Quick Setup Checklist

- [ ] Configure environment variables
- [ ] Replace candidate information
- [ ] Update campaign photos and images
- [ ] Customize colors and branding
- [ ] Configure contact information
- [ ] Set up social media links
- [ ] Configure donation system
- [ ] Test deployment

## Step 1: Environment Configuration

### 1.1 Copy Template File
```bash
cp .env.template .env
```

### 1.2 Configure Required Variables
Edit `.env` with your campaign details:

```bash
# Candidate Information
CANDIDATE_NAME="Jane Smith"
CANDIDATE_POSITION="City Council Ward 3"
CANDIDATE_ELECTION_YEAR="2024"
CANDIDATE_PARTY="Democratic"

# Campaign Details
CAMPAIGN_DOMAIN="janesmith2024.com"
CAMPAIGN_SLOGAN="Building a Better Tomorrow"
CAMPAIGN_EMAIL="info@janesmith2024.com"
CAMPAIGN_PHONE="(555) 123-4567"

# Office Information
CAMPAIGN_ADDRESS="123 Main Street"
CAMPAIGN_CITY="Springfield"
CAMPAIGN_STATE="Illinois"
CAMPAIGN_ZIP="62701"
CAMPAIGN_OFFICE_HOURS="Mon-Fri 9am-7pm, Sat 10am-4pm"

# Social Media
TWITTER_HANDLE="@JaneSmith2024"
FACEBOOK_PAGE="facebook.com/JaneSmith2024"
INSTAGRAM_HANDLE="@JaneSmith2024"
YOUTUBE_CHANNEL="UCxxx"

# Website Configuration
NEXT_PUBLIC_BASE_PATH=""
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=""
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=""
```

## Step 2: Content Customization

### 2.1 About Page (`src/web/app/about/page.tsx`)
Replace template content with candidate's biography:

```typescript
// Update metadata
export const metadata = {
  title: 'About [CANDIDATE_NAME] | [POSITION] Candidate',
  description: 'Learn about [CANDIDATE_NAME], candidate for [POSITION]...',
};

// Update biography content
// Replace sections: Background, Experience, Personal Life
```

### 2.2 Platform Page (`src/web/app/platform/page.tsx`)
Update with candidate's policy positions:

```typescript
// Update platform issues array
const platformIssues = [
  {
    title: "Economic Development",
    description: "Your policy description...",
    icon: "...",
    details: [
      "Specific policy point 1",
      "Specific policy point 2"
    ]
  },
  // Add more issues
];
```

### 2.3 FAQ Page (`src/web/app/faq/page.tsx`)
Customize frequently asked questions:

```typescript
const faqs: FAQCategories = {
  campaign: [
    {
      question: "What position is [CANDIDATE_NAME] running for?",
      answer: "[CANDIDATE_NAME] is running for [POSITION]..."
    }
  ],
  // Update all FAQ categories
};
```

### 2.4 Contact Information
Update all contact references:
- `src/web/app/contact/page.tsx`
- `src/web/app/get-involved/page.tsx`
- `src/web/app/components/Footer.tsx`

## Step 3: Visual Customization

### 3.1 Replace Images
Replace these placeholder images in `src/web/public/images/`:

```
Required Images:
├── candidate-profile.jpg (400x400px) - Main profile photo
├── candidate-hero.jpg (1200x800px) - Hero section background
├── campaign-office.jpg (800x600px) - Office/team photo
├── campaign-event-*.jpg - Event photos
└── logo.png (200x200px) - Campaign logo
```

### 3.2 Update Favicon and App Icons
Replace in `src/web/public/`:
```
├── favicon.ico
├── apple-touch-icon.png
├── icon-192.png
└── icon-512.png
```

### 3.3 Customize Colors
Edit `src/web/app/globals.css`:

```css
:root {
  /* Primary color - main campaign color */
  --primary: 210 100% 56%;
  --primary-foreground: 0 0% 100%;
  
  /* Secondary color - accent color */
  --secondary: 195 100% 50%;
  --secondary-foreground: 0 0% 100%;
  
  /* Additional colors can be customized */
}
```

### 3.4 Typography
Update fonts in `src/web/app/layout.tsx`:

```typescript
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display'
})
```

## Step 4: Component Customization

### 4.1 Hero Section (`src/web/app/components/Hero.tsx`)
Update the main hero content:

```typescript
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-display">
  <span className="text-white">Vote</span>{' '}
  <span className="text-white text-6xl md:text-7xl lg:text-8xl block font-black tracking-tight">
    {process.env.CANDIDATE_NAME}
  </span>
</h1>
```

### 4.2 Navigation (`src/web/app/components/Navigation.tsx`)
Customize navigation items if needed:

```typescript
const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/platform', label: 'Platform' },
  // Add or remove navigation items
];
```

### 4.3 Footer (`src/web/app/components/Footer.tsx`)
Update footer information and social links.

## Step 5: Functionality Configuration

### 5.1 Contact Form
Configure email service in `src/web/app/api/contact/route.ts`:

```typescript
// Option 1: SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Option 2: Nodemailer with SMTP
// Configure your preferred email service
```

### 5.2 Newsletter Signup
Configure email marketing integration:

```typescript
// Mailchimp, ConvertKit, or other email service
// Update src/web/app/components/NewsletterSignup.tsx
```

### 5.3 Analytics
Add tracking codes in `src/web/app/layout.tsx`:

```typescript
// Google Analytics
{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
  <Script
    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
    strategy="afterInteractive"
  />
)}
```

## Step 6: Content Guidelines

### 6.1 Writing Style
- Use active voice and clear, concise language
- Focus on voter benefits and specific solutions
- Include calls-to-action on every page
- Maintain consistent tone throughout

### 6.2 Image Guidelines
- Use high-quality, professional photos
- Ensure diverse representation in campaign photos
- Optimize images for web (WebP format recommended)
- Include alt text for accessibility

### 6.3 SEO Optimization
- Update meta descriptions for each page
- Include relevant keywords naturally
- Use structured data markup
- Optimize images with descriptive filenames

## Step 7: Testing Your Customization

### 7.1 Local Testing
```bash
cd src/web
npm run dev
# Visit http://localhost:3000
```

### 7.2 Build Testing
```bash
npm run build
npm run start
```

### 7.3 Mobile Testing
- Test on various screen sizes
- Verify touch interactions work correctly
- Check loading performance on mobile networks

### 7.4 Accessibility Testing
- Use browser accessibility tools
- Test with screen readers
- Verify keyboard navigation
- Check color contrast ratios

## Step 8: Deployment Preparation

### 8.1 Production Environment Variables
Create production `.env` with real values:
- Remove any test/development values
- Ensure all secrets are properly secured
- Verify domain configurations

### 8.2 Domain Setup
- Configure DNS records
- Set up SSL certificates
- Test domain propagation

### 8.3 Final Review
- [ ] All placeholder content replaced
- [ ] Contact information updated
- [ ] Images optimized and replaced
- [ ] Forms working correctly
- [ ] Analytics configured
- [ ] Social media links updated
- [ ] SEO metadata complete

## Troubleshooting Common Issues

### Build Errors
- Verify all environment variables are set
- Check for TypeScript errors
- Ensure all required images exist

### Styling Issues
- Clear browser cache
- Check CSS variable definitions
- Verify Tailwind classes are correct

### Content Not Updating
- Restart development server
- Check file paths are correct
- Verify environment variables are loaded

## Additional Customization

For advanced customization beyond this guide, see:
- `DEVELOPMENT.md` for technical development details
- `DEPLOYMENT.md` for deployment-specific configuration
- Individual component files for detailed customization options

Remember to test thoroughly after each customization step to ensure everything works correctly.