'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false); // To track if the component is mounted
  const [error, setError] = useState(""); // To manage error messages
  const [loading, setLoading] = useState(false); // To manage loading state

  useEffect(() => {
    setIsMounted(true); // Set to true when the component mounts
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    setError(""); // Reset error message

    try {
      const response = await fetch(`/api/?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Invalid credentials'); // Handle non-200 responses
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Handle successful login (e.g., redirect or update user state)
    } catch (err: any) {
      setError(err.message || 'Something went wrong'); // Set error message
      console.error("Login error:", err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (!isMounted) {
    return <div>Loading...</div>; // Render a loading state while mounting
  }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
            <CardFooter>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
