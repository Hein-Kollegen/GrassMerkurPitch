import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "800"]
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
      <body className={`${raleway.variable}`}>
        {children}
      </body>
    </html>
  );
}
