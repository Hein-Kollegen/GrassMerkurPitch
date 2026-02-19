import "./globals.css";
import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
