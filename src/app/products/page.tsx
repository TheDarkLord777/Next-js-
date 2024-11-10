"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SpinWheel from "@/components/fortune_wheel/fortune_wheel";
import { useAuth } from "./../context/AuthContext";


type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Premium Headphones", price: 199.99, category: "Electronics", image: "/head.webp?height=200&width=200" },
  { id: 2, name: "Smartwatch Pro", price: 299.99, category: "Electronics", image: "/smart.jpg?height=200&width=200" },
  { id: 3, name: "RGB Keyboard", price: 79.99, category: "Electronics", image: "/i.webp?height=200&width=200" },
  { id: 4, name: "Ergonomic Office Chair", price: 249.99, category: "Furniture", image: "/ergomic.jpg?height=200&width=200" },
  { id: 5, name: "LED Desk Lamp", price: 39.99, category: "Lighting", image: "/ledDesk.jpg?height=200&width=200" },
  { id: 6, name: "Portable Bluetooth Speaker", price: 89.99, category: "Electronics", image: "/speaker.jpg?height=200&width=200" },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [prizeWon, setPrizeWon] = useState<string>("");
  const { isLoggedIn } = useAuth();


  const handleSpinComplete = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    setPrizeWon(randomProduct.name);
    alert(`Congratulations! You won: ${randomProduct.name}`);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || product.category === selectedCategory)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      {isLoggedIn && (
        <SpinWheel
          isLoggedIn={isLoggedIn}
          onComplete={handleSpinComplete}
        />
      )}

      <div className="flex flex-col md:flex-row mb-4 space-y-4 md:space-y-0 md:space-x-4">
        <Input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Furniture">Furniture</SelectItem>
            <SelectItem value="Lighting">Lighting</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>${product.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-4"
              />
              <p className="text-sm text-muted-foreground">Category: {product.category}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/product/${product.id}`} className="w-full">
                <Button className="w-full">View Product</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {prizeWon && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
          <h2 className="font-semibold">Congratulations!</h2>
          <p>You won: <strong>{prizeWon}</strong></p>
        </div>
      )}
    </div>
  );
}