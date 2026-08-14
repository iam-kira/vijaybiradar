import type { Metadata } from "next";
import "./globals.css";
import { SoundProvider } from "@/components/shared/SoundProvider";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { GlowCursor } from "@/components/shared/GlowCursor";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SoundControlWidget } from "@/components/layout/SoundControlWidget";

export const metadata: Metadata = {
  title: "Vijay Biradar — Enterprise Data Engineer & AI Platform Builder",
  description:
    "Veni. Vidi. Vici. Building platforms, solving problems, living stories. Enterprise Data Engineer at Daimler Truck Innovation Center India.",
  openGraph: {
    title: "Vijay Biradar",
    description: "Enterprise Data Engineer · AI Platform Builder · Cybersecurity SPOC",
    url: "https://iam-kira.github.io/vijaybiradar",
    images: [{ url: "/vijaybiradar/images/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased overflow-x-hidden">
        <SoundProvider>
          <MotionProvider>
            <ScrollProgress />
            <div className="scan-line" aria-hidden="true" />
            <GlowCursor />
            <Navbar />
            <CommandPalette />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
            <SoundControlWidget />
          </MotionProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
