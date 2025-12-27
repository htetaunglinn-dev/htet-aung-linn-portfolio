import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Htet Aung Linn | Full Stack Developer & Software Engineer",
    template: "%s | Htet Aung Linn",
  },
  description:
    "Htet Aung Linn - Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Experienced software engineer building scalable web applications.",
  keywords: [
    "Htet Aung Linn",
    "Htet Aung Linn portfolio",
    "Htet Aung Linn developer",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Htet Aung Linn" }],
  creator: "Htet Aung Linn",
  publisher: "Htet Aung Linn",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://htet-aung-linn-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://htet-aung-linn-portfolio.vercel.app",
    title: "Htet Aung Linn | Full Stack Developer & Software Engineer",
    description:
      "Htet Aung Linn - Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies. Experienced software engineer building scalable web applications.",
    siteName: "Htet Aung Linn Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Htet Aung Linn - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Htet Aung Linn | Full Stack Developer & Software Engineer",
    description:
      "Htet Aung Linn - Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "KP0wwKEaVLSVHwtTm5nnAMoIvkpnE88VyXOzMU381JE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Htet Aung Linn",
    url: "https://htet-aung-linn-portfolio.vercel.app",
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies",
    sameAs: [
      "https://github.com/htetaunglinn-dev",
      "https://www.linkedin.com/in/htet-aung-linn-51146923b/",
      "https://www.facebook.com/profile.php?id=100064075331112",
    ],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Web Development",
      "Software Engineering",
      "Full Stack Development",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
