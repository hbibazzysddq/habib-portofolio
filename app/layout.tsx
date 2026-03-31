import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import dynamic from "next/dynamic";

const StairTransition = dynamic(() => import("@/components/StairTransition"), { ssr: false });
const PageTransition = dynamic(() => import("@/components/PageTransition"), { ssr: false });

  const jetbrainsMono = JetBrains_Mono({ 
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    variable: '--font-jetbrainsMono'
  });

  export const metadata: Metadata = {
    title: "Habib Azizy Siddiq",
    description: "Portofolio Website",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className={jetbrainsMono.variable}>
          <Header/>
          <StairTransition/>
          <PageTransition />
          {children}
        </body>
      </html>
    );
  }
