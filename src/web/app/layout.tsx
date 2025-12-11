import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider"; // Ensure ThemeProvider.tsx exists in the components folder

const candidateName = process.env.NEXT_PUBLIC_CANDIDATE_NAME || "[CANDIDATE_NAME]";
const position = process.env.NEXT_PUBLIC_CANDIDATE_POSITION || "[CANDIDATE_POSITION]";
const domain = process.env.NEXT_PUBLIC_CAMPAIGN_DOMAIN || "[CAMPAIGN_DOMAIN]";

export const metadata: Metadata = {
  title: `${candidateName} for ${position} | Progressive Leadership`,
  description: `Official campaign website for ${candidateName}, candidate for ${position}. Learn about their platform, events, and how to get involved.`,
  keywords: `${candidateName}, ${position}, campaign, election, politics, progressive leadership`,
  authors: [{ name: `${candidateName} Campaign Team` }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${domain}`,
    title: `${candidateName} for ${position} | Progressive Leadership`,
    description: `Official campaign website for ${candidateName}, candidate for ${position}.`,
    siteName: `${candidateName} for ${position}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${candidateName} for ${position} | Progressive Leadership`,
    description: `Official campaign website for ${candidateName}, candidate for ${position}.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load Google Fonts asynchronously via CSS to avoid build-time network calls */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&family=Source+Sans+3:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Skip navigation link for screen readers */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
