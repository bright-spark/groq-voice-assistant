import "@livekit/components-styles";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { Metadata, Viewport } from "next";

const publicSans400 = Public_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#4f4f4f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Belinda - Voice Assistant",
  description: "Belinda is a voice assistant powered by Groq and Microsoft",
  manifest: "/manifest.json",
  icons: {
    icon: ['/icon.png'], // Using icon.png instead of favicon.ico since it's working
    apple: ['/icons/icon-192.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Belinda",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${publicSans400.className}`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="h-full">{children}</body>
    </html>
  );
}
