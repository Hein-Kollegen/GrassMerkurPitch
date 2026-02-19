import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";

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
        {children}
      </body>
    </html>
  );
}
