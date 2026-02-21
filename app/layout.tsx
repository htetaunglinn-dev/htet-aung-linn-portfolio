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
    "I'm a passionate Software Engineer building high-performance web applications that drive business growth.",
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
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [{ rel: "icon", url: "/favicon/favicon.ico" }],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://htet-aung-linn-portfolio.vercel.app",
    title: "Htet Aung Linn | Full Stack Developer & Software Engineer",
    description:
      "I'm a passionate Software Engineer building high-performance web applications that drive business growth.",
    siteName: "Htet Aung Linn Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 960,
        height: 960,
        alt: "Htet Aung Linn - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Htet Aung Linn | Full Stack Developer & Software Engineer",
    description:
      "I'm a passionate Software Engineer building high-performance web applications that drive business growth.",
    images: ["/profile.jpg"],
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
