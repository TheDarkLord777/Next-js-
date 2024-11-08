import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyShop",
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
                MyShop
              </Link>
              <nav>
                <ul className="flex space-x-4 items-center">
                  <li>
                    <Link href="/">
                      <Button variant="link">Home</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/products">
                      <Button variant="link">Products</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/login">
                      <Button variant="link">Login</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/register">
                      <Button variant="link">Register</Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/cart">
                      <Button variant="outline" size="icon">
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Cart</span>
                      </Button>
                    </Link>
                  </li>
                  <li>
                    <Link href="/profile">
                      <Button variant="outline" size="icon">
                        <User className="h-4 w-4" />
                        <span className="sr-only">Profile</span>
                      </Button>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-grow">{children}</main>
          <footer className="border-t mt-8">
            <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
              © 2024 MyShop. All rights reserved. Designed by Maxmudbek
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
