import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Novik Code — Design · Development · Innovation",
  description: "We build premium digital products powered by AI. Software house specializing in web applications, SaaS platforms, and intelligent automation.",
  keywords: ["software house", "web development", "AI", "SaaS", "dental software", "Novik Code"],
  metadataBase: new URL("https://novikcode.com"),
  openGraph: {
    title: "Novik Code — Design · Development · Innovation",
    description: "Premium digital products powered by AI",
    url: "https://novikcode.com",
    siteName: "Novik Code",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novik Code",
    description: "Premium digital products powered by AI",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise">
        {children}
      </body>
    </html>
  );
}
