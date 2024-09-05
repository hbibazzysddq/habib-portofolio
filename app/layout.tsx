  import type { Metadata } from "next";
  import { JetBrains_Mono } from "next/font/google";
  import "./globals.css";
  import Header from "@/components/Header";
  import PageTransition from "@/components/PageTransition";
  import StairETransition from "@/components/StairTransition";

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
          <StairETransition/>
          <PageTransition>
            {children}
          </PageTransition>
        </body>
      </html>
    );
  }
