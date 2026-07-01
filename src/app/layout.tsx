import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});
const jetbrains = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});
const grotesk = Space_Grotesk({subsets:['latin'],variable:'--font-heading'});

export const metadata: Metadata = {
  title: "Algo1 - Turn plain English into a live trading strategy",
  description: "The no-code AI algorithmic-trading-strategy builder. Describe your rules naturally, and let Algo1 write, test, and deploy the code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "dark", inter.variable, jetbrains.variable, grotesk.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
