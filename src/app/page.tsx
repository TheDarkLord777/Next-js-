import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const featuredProducts = [
  { id: 1, name: "Premium Headphones", price: 199.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Smartwatch Pro", price: 299.99, image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Wireless Keyboard", price: 79.99, image: "/placeholder.svg?height=200&width=200" },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to MyShop</h1>
      <p className="text-xl mb-8">Discover our amazing products at unbeatable prices!</p>
      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
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
            </CardContent>
            <CardFooter>
              <Link href={`/product/${product.id}`} className="w-full">
                <Button className="w-full">View Product</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}