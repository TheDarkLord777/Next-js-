import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// This would typically come from your database or API
const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    category: "Electronics",
    image: "/head.webp?height=400&width=400",
    description: "High-quality over-ear headphones with noise cancellation.",
  },
  {
    id: 2,
    name: "Smartwatch Pro",
    price: 299.99,
    category: "Electronics",
    image: "/smart.jpg?height=400&width=400",
    description:
      "Advanced smartwatch with health tracking and cellular connectivity.",
  },
  {
    id: 3,
    name: "RGB Keyboard",
    price: 79.99,
    category: "Electronics",
    image: "/i.webp?height=400&width=400",
    description: "Ergonomic wireless keyboard with customizable backlight.",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 249.99,
    category: "Furniture",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Comfortable office chair with lumbar support and adjustable height.",
  },
  {
    id: 5,
    name: "LED Desk Lamp",
    price: 39.99,
    category: "Lighting",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Energy-efficient LED desk lamp with adjustable brightness and color temperature.",
  },
  {
    id: 6,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    category: "Electronics",
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Waterproof Bluetooth speaker with 360-degree sound and 20-hour battery life.",
  },
];

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id.toString() === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>${product.price.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 space-y-4">
            <p>{product.description}</p>
            <p className="text-sm text-muted-foreground">
              Category: {product.category}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
