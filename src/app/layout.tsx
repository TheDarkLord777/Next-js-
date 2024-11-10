import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./navbar"; // We'll create this client component
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClickBuy",
  description: "Your one-stop shop for everything",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
                <img
                  src="/light.png"
                  alt="Logo"
                  className="h-16 dark:hidden"
                />
                <img
                  src="/dark.png"
                  alt="Logo"
                  className="h-16 hidden dark:block"
                />
              </Link>
              <NavBar />
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="border-t mt-8">
            <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
              © 2024 ClickBuy. All rights reserved. Designed by Maxmudbek
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}