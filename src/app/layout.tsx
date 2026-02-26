import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollTriggerStabilityProvider from "@/components/providers/ScrollTriggerStabilityProvider";
import PageBootProvider from "@/components/providers/PageBootProvider";
import PageLoader from "@/components/ui/PageLoader";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "800"]
});

const ralewayBody = Raleway({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "800"]
});

export const metadata: Metadata = {
  title: "Grass Merkur Pitch",
  description: "Pitch site built with Next.js, Tailwind, and GSAP."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${raleway.variable} ${ralewayBody.variable}`}>
        <PageBootProvider>
          <ScrollTriggerStabilityProvider />
          <CustomCursor />
          {children}
          <PageLoader />
        </PageBootProvider>
      </body>
    </html>
  );
}
