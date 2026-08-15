import type { Metadata } from "next";
import { Fraunces, Cinzel, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/components/shared/SoundProvider";
import { MotionProvider } from "@/components/shared/MotionProvider";
import { CommandPalette } from "@/components/shared/CommandPalette";
import { GlowCursor } from "@/components/shared/GlowCursor";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SoundControlWidget } from "@/components/layout/SoundControlWidget";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["400", "500", "600", "700"] });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel", weight: ["400", "600"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300", "400", "500", "600", "700"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", weight: ["400", "500"] });

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('vjb-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://iam-kira.github.io"),
  title: "Vijay Biradar — Imperium · Enterprise Data Engineer & AI Platform Builder",
  description:
    "Complexity yields to discipline. Enterprise Data Engineer and AI Platform Builder at Daimler Truck Innovation Center India — building the systems that hold.",
  openGraph: {
    title: "Vijay Biradar · Imperium",
    description: "Enterprise Data Engineer · AI Platform Builder · Cybersecurity SPOC",
    url: "https://iam-kira.github.io/vijaybiradar",
    images: [{ url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${cinzel.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased overflow-x-hidden font-sans">
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
