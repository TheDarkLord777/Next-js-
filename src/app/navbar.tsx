'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
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
  );
}