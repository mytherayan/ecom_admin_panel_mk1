'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Plus, Minus, X, Star, CreditCard } from 'lucide-react'

// Product type definition
type Product = {
  id: number
  name: string
  price: number
  image: string
  description: string
  rating: number
  reviews: number
}

// Sample product data
const products: Product[] = [
  { id: 1, name: "Classic T-Shirt", price: 1499, image: "/placeholder.svg", description: "A comfortable and stylish t-shirt for everyday wear.", rating: 4.5, reviews: 120 },
  { id: 2, name: "Denim Jeans", price: 3999, image: "/placeholder.svg", description: "High-quality denim jeans that are both durable and fashionable.", rating: 4.2, reviews: 85 },
  { id: 3, name: "Sneakers", price: 5999, image: "/placeholder.svg", description: "Lightweight and comfortable sneakers perfect for any casual occasion.", rating: 4.7, reviews: 200 },
  { id: 4, name: "Leather Wallet", price: 2499, image: "/placeholder.svg", description: "A sleek and practical leather wallet with multiple card slots.", rating: 4.0, reviews: 50 },
  { id: 5, name: "Sunglasses", price: 2999, image: "/placeholder.svg", description: "Stylish sunglasses that offer 100% UV protection.", rating: 4.3, reviews: 75 },
  { id: 6, name: "Wristwatch", price: 7999, image: "/placeholder.svg", description: "An elegant wristwatch that combines style with functionality.", rating: 4.6, reviews: 110 },
  { id: 7, name: "Backpack", price: 3499, image: "/placeholder.svg", description: "A spacious and durable backpack for your daily adventures.", rating: 4.4, reviews: 95 },
  { id: 8, name: "Wireless Earbuds", price: 8999, image: "/placeholder.svg", description: "High-quality wireless earbuds with noise cancellation.", rating: 4.8, reviews: 150 },
]

// Cart item type definition
type CartItem = Product & { quantity: number }

export function EnhancedECommercePage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    // This is where you would typically integrate with a payment gateway
    // For demonstration purposes, we'll just simulate a successful order
    setTimeout(() => {
      setOrderComplete(true)
      setCart([])
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">DotShop</div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Shop</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
              </SheetHeader>
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">Your cart is empty</p>
              ) : (
                <div className="mt-4 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <p className="font-semibold">Total: ₹{totalPrice.toFixed(2)}</p>
                    <Button className="w-full mt-4" onClick={() => setCheckoutStep(1)}>Proceed to Checkout</Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to DotShop</h1>
          <p className="text-xl mb-8">Discover amazing products at unbeatable prices!</p>
          <Button size="lg">Shop Now</Button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <Card key={product.id}>
                <CardHeader>
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t" />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <p className="text-gray-500">₹{product.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{product.name}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded mb-4" />
                        <p className="text-gray-700 mb-2">{product.description}</p>
                        <p className="font-semibold mb-2">₹{product.price.toFixed(2)}</p>
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                          <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
                        </div>
                        <Button onClick={() => addToCart(product)} className="w-full">Add to Cart</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About DotShop</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="mb-4">
              DotShop is your one-stop destination for all your shopping needs. We offer a wide range of high-quality products at competitive prices, ensuring that you always find what you're looking for.
            </p>
            <p className="mb-4">
              Our mission is to provide an easy, convenient, and enjoyable shopping experience for our customers. We carefully curate our product selection to bring you the best in fashion, electronics, home goods, and more.
            </p>
            <p>
              With our commitment to customer satisfaction, fast shipping, and excellent customer service, we strive to make every shopping experience with DotShop a pleasant one.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="max-w-md mx-auto">
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  placeholder="Your message"
                ></textarea>
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Checkout Dialog */}
      <Dialog open={checkoutStep > 0} onOpenChange={() => setCheckoutStep(0)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          {checkoutStep === 1 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() =>   setCheckoutStep(2)}>
                Proceed to Payment
              </Button>
            </div>
          )}
          {checkoutStep === 2 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <Button className="w-full" onClick={handleCheckout}>
                  Pay ₹{totalPrice.toFixed(2)}
                </Button>
              </form>
            </div>
          )}
          {orderComplete && (
            <div className="mt-4 text-center">
              <h3 className="font-semibold mb-2">Order Completed!</h3>
              <p>Thank you for your purchase. Your order has been successfully placed.</p>
              <Button className="mt-4" onClick={() => {setOrderComplete(false); setCheckoutStep(0);}}>
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
                <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Our Story</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">Facebook</a>
                <a href="#" className="hover:text-gray-300">Twitter</a>
                <a href="#" className="hover:text-gray-300">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            © 2024 DotShop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

// API connection code (commented out)
/*
import axios from 'axios';

// Fetch products from API
const fetchProducts = async () => {
  try {
    const response = await axios.get('https://api.example.com/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Submit order to API
const submitOrder = async (orderData) => {
  try {
    const response = await axios.post('https://api.example.com/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};

// These functions can be used in the component to fetch data and submit orders
// For example:
// useEffect(() => {
//   fetchProducts().then(setProducts);
// }, []);
//
// const handleCheckout = async () => {
//   try {
//     const orderData = { items: cart, total: totalPrice };
//     await submitOrder(orderData);
//     setOrderComplete(true);
//     setCart([]);
//   } catch (error) {
//     // Handle error (e.g., show error message to user)
//   }
// };
*/