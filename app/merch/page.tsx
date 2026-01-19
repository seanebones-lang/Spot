"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ShoppingCart, Plus, Minus, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { cn } from "@/lib/utils";

// Mock merch data
const merchItems = [
  // Apparel
  {
    id: "1",
    name: "EmPulse Music T-Shirt",
    price: "$29.99",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80",
    category: "Apparel",
  },
  {
    id: "2",
    name: "NextEleven Label Hoodie",
    price: "$59.99",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&q=80",
    category: "Apparel",
  },
  {
    id: "3",
    name: "EmPulse Logo Cap",
    price: "$24.99",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop&q=80",
    category: "Apparel",
  },
  {
    id: "4",
    name: "Music Note Crewneck",
    price: "$49.99",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop&q=80",
    category: "Apparel",
  },
  {
    id: "5",
    name: "Vintage Band Tee",
    price: "$34.99",
    image:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=400&h=400&fit=crop&q=80",
    category: "Apparel",
  },
  {
    id: "6",
    name: "Wellness Tank Top",
    price: "$27.99",
    image:
      "https://images.unsplash.com/photo-1607344645866-009c8c4069aa?w=400&h=400&fit=crop&q=80",
    category: "Apparel",
  },
  // Music & Vinyl
  {
    id: "7",
    name: "Metal Essentials Vinyl",
    price: "$24.99",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80",
    category: "Music",
  },
  {
    id: "8",
    name: "Chill Vibes LP",
    price: "$27.99",
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop&q=80",
    category: "Music",
  },
  {
    id: "9",
    name: "Electronic Dreams Record",
    price: "$26.99",
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop&q=80",
    category: "Music",
  },
  {
    id: "10",
    name: "Jazz Collection Vinyl",
    price: "$29.99",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&q=80",
    category: "Music",
  },
  // Accessories
  {
    id: "11",
    name: "Music Festival Tote Bag",
    price: "$19.99",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop&q=80",
    category: "Accessories",
  },
  {
    id: "12",
    name: "EmPulse Water Bottle",
    price: "$22.99",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&q=80",
    category: "Accessories",
  },
  {
    id: "13",
    name: "Studio Headphones",
    price: "$79.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&q=80",
    category: "Accessories",
  },
  {
    id: "14",
    name: "Vinyl Record Stand",
    price: "$39.99",
    image:
      "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=400&h=400&fit=crop&q=80",
    category: "Accessories",
  },
  {
    id: "15",
    name: "Music Note Keychain",
    price: "$12.99",
    image:
      "https://images.unsplash.com/photo-1583385276756-6d7556590b53?w=400&h=400&fit=crop&q=80",
    category: "Accessories",
  },
  // Collectibles
  {
    id: "16",
    name: "Limited Edition Poster",
    price: "$34.99",
    image:
      "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&h=400&fit=crop&q=80",
    category: "Collectibles",
  },
  {
    id: "17",
    name: "Artist Autograph Book",
    price: "$18.99",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop&q=80",
    category: "Collectibles",
  },
  {
    id: "18",
    name: "Concert Ticket Stub Frame",
    price: "$29.99",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&q=80",
    category: "Collectibles",
  },
  // Home & Lifestyle
  {
    id: "19",
    name: "Record Player",
    price: "$149.99",
    image:
      "https://images.unsplash.com/photo-1566108005-0ce11d9c8fd5?w=400&h=400&fit=crop&q=80",
    category: "Home & Lifestyle",
  },
  {
    id: "20",
    name: "Music Mood Candle",
    price: "$24.99",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&q=80",
    category: "Home & Lifestyle",
  },
  {
    id: "21",
    name: "Vinyl Storage Box",
    price: "$44.99",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop&q=80",
    category: "Home & Lifestyle",
  },
  {
    id: "22",
    name: "Music Notes Throw Pillow",
    price: "$32.99",
    image:
      "https://images.unsplash.com/photo-1584100936595-6086aae25d72?w=400&h=400&fit=crop&q=80",
    category: "Home & Lifestyle",
  },
];

export default function MerchPage() {
  const { items, addItem, removeItem, updateQuantity, getTotal, getItemCount } =
    useCartStore();
  const [showCart, setShowCart] = useState(false);
  const total = getTotal();
  const itemCount = getItemCount();

  const handleAddToCart = (item: (typeof merchItems)[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price.replace("$", "")),
      image: item.image,
    });
  };

  return (
    <div
      className="min-h-screen bg-spotify-dark text-white p-8"
      style={{
        minHeight: "100vh",
        backgroundColor: "#121212",
        padding: "32px",
        color: "#FFFFFF",
      }}
    >
      <div
        className="flex items-center justify-between mb-8"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "32px",
          gap: "16px",
        }}
      >
        <h1
          className="text-4xl font-bold"
          style={{
            fontSize: "32px",
            lineHeight: "36px",
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          Merch Store
        </h1>
        <button
          onClick={() => setShowCart(true)}
          className="relative flex items-center gap-2 bg-spotify-light-gray hover:bg-spotify-dark-gray px-4 py-2 rounded-full transition-colors"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#181818",
            padding: "12px 24px",
            borderRadius: "500px",
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            transition: "all 200ms ease-out",
            border: "none",
            cursor: "pointer",
            color: "#FFFFFF",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#282828";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#181818";
          }}
        >
          <ShoppingCart
            size={20}
            style={{
              width: "20px",
              height: "20px",
              flexShrink: 0,
            }}
          />
          <span>Cart</span>
          {itemCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-spotify-green text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "#7209B7",
                color: "#000000",
                fontSize: "11px",
                lineHeight: "16px",
                fontWeight: 700,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {merchItems.length === 0 ? (
        <div
          className="text-center py-24"
          style={{
            textAlign: "center",
            padding: "96px 16px",
          }}
        >
          <ShoppingBag
            className="w-16 h-16 text-spotify-text-gray mx-auto mb-4"
            style={{
              width: "64px",
              height: "64px",
              color: "#B3B3B3",
              margin: "0 auto 16px auto",
            }}
          />
          <p
            className="text-spotify-text-gray text-xl font-medium mb-2"
            style={{
              fontSize: "20px",
              lineHeight: "28px",
              fontWeight: 600,
              color: "#B3B3B3",
              marginBottom: "8px",
            }}
          >
            No merch available yet
          </p>
          <p
            className="text-spotify-text-gray text-sm"
            style={{
              fontSize: "14px",
              lineHeight: "20px",
              color: "#B3B3B3",
            }}
          >
            Check back soon for exclusive merchandise
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          style={{ gap: "24px" }}
        >
          {merchItems.map((item) => (
            <div
              key={item.id}
              className="bg-spotify-light-gray hover:bg-spotify-dark-gray rounded-lg p-4 transition-all duration-200 group"
              style={{
                backgroundColor: "#181818",
                borderRadius: "8px",
                padding: "16px",
                transition: "background-color 200ms ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#282828";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#181818";
              }}
            >
              <div
                className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray"
                style={{
                  borderRadius: "4px",
                  aspectRatio: "1",
                  marginBottom: "16px",
                  backgroundColor: "#282828",
                }}
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{
                      borderRadius: "4px",
                      transition: "transform 200ms ease-out",
                    }}
                  />
                )}
              </div>
              <h3
                className="font-semibold text-sm text-white mb-1 truncate"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: "4px",
                }}
              >
                {item.name}
              </h3>
              <p
                className="text-xs text-spotify-text-gray mb-2"
                style={{
                  fontSize: "13px",
                  lineHeight: "16px",
                  color: "#B3B3B3",
                  marginBottom: "8px",
                }}
              >
                {item.category}
              </p>
              <p
                className="text-spotify-green font-medium mb-3"
                style={{
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 600,
                  color: "#7209B7",
                  marginBottom: "12px",
                }}
              >
                {item.price}
              </p>
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-transparent border-2 border-spotify-green text-spotify-green hover:shadow-[0_0_20px_rgba(29,185,84,0.6)] py-2 rounded-full font-medium text-sm transition-all duration-300"
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  border: "2px solid #7209B7",
                  color: "#7209B7",
                  padding: "8px 16px",
                  borderRadius: "500px",
                  fontSize: "14px",
                  lineHeight: "20px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  transition: "all 200ms ease-out",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(29, 185, 84, 0.1)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-end">
          <div className="bg-spotify-dark-gray w-full max-w-md h-full flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-spotify-text-gray hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 text-spotify-text-gray mx-auto mb-4" />
                  <p className="text-spotify-text-gray">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-spotify-light-gray rounded-lg p-4"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-spotify-text-gray">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-spotify-dark-gray rounded hover:bg-spotify-dark-gray/80"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center bg-spotify-dark-gray rounded hover:bg-spotify-dark-gray/80"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-spotify-text-gray hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full bg-transparent border-2 border-spotify-green text-spotify-green hover:shadow-[0_0_20px_rgba(29,185,84,0.6)] py-3 rounded-full font-semibold transition-all duration-300">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
