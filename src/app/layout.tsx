import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LiveFeedProvider } from "@/context/LiveFeedContext";
import { ThemeProvider } from "@/context/ThemeContext";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI-AFRICA | The Future of Business",
  description: "The Future of African Business",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.variable} ${rajdhani.variable} antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <LiveFeedProvider>
              {children}
            </LiveFeedProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

