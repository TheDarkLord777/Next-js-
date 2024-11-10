'use client';

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/"); // Redirect to home page after logout
  };

  // Avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold">
                <img
                  src={
                    typeof window !== "undefined" &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                      ? "/dark.png"
                      : "/light.png"
                  }
                  alt="Logo"
                  className="h-16"
                />
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
                  {!isLoggedIn ? (
                    <>
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
                    </>
                  ) : (
                    <li>
                      <Button 
                        variant="link" 
                        onClick={handleLogout}
                        className="flex items-center gap-2"
                      >
                        Logout
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </li>
                  )}
                  <li>
                    <Link href="/cart">
                      <Button variant="outline" size="icon">
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only">Cart</span>
                      </Button>
                    </Link>
                  </li>
                  {isLoggedIn && (
                    <li>
                      <Link href="/profile">
                        <Button variant="outline" size="icon">
                          <User className="h-4 w-4" />
                          <span className="sr-only">Profile</span>
                        </Button>
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
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