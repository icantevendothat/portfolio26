import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "annika santhanam",
  description: "art, design, technology, etc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
     <head>
      <link rel="stylesheet" href="https://use.typekit.net/ihk4wcw.css"></link>
      </head>
      <body className="h-full font-sans antialiased bg-black text-[#1a1a1a] overflow-hidden">
        {children}
      </body>
    </html>
  );
}