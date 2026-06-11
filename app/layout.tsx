import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-heading",
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-body",
  subsets: ["hebrew", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yarin Zakuto Hair Design — סטודיו לעיצוב שיער",
  description:
    "Yarin Zakuto Hair Design — סטודיו מודרני לעיצוב שיער: תספורות אלגנטיות, צבע ועיצוב לכלות. קבעו את התור שלכם עוד היום.",
  keywords: [
    "מספרה",
    "עיצוב שיער",
    "תספורת",
    "שיער לכלות",
    "באליאז'",
    "Yarin Zakuto",
  ],
  openGraph: {
    title: "Yarin Zakuto Hair Design",
    description: "סטודיו מודרני לעיצוב שיער — תספורות, צבע ועיצוב לכלות.",
    type: "website",
    locale: "he_IL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${frankRuhl.variable} ${assistant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-ink">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
