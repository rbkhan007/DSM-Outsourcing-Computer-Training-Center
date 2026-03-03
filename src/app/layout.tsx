import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DSM Outsourcing & Computer Training Center | Premier IT Training in Bangladesh",
  description: "Transform your career with industry-leading courses in web development, graphic design, digital marketing, and more. DSM offers comprehensive tech training with hands-on projects and job assistance.",
  keywords: ["DSM", "Computer Training", "Web Development", "Graphic Design", "Digital Marketing", "Bangladesh", "IT Training", "Career Development"],
  authors: [{ name: "DSM Outsourcing" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "DSM Outsourcing & Computer Training Center",
    description: "Premier IT training center in Bangladesh offering comprehensive tech courses",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DSM Outsourcing & Computer Training Center",
    description: "Premier IT training center in Bangladesh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground relative`}
      >
        <div className="matrix-background-wrapper">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
