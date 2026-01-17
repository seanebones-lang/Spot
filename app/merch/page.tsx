'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { cn } from '@/lib/utils';

// Mock merch data
const merchItems = [
  {
    id: '1',
    name: 'EmPulse Music T-Shirt',
    price: '$29.99',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&q=80',
    category: 'Apparel'
  },
  {
    id: '2',
    name: 'NextEleven Label Hoodie',
    price: '$59.99',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&q=80',
    category: 'Apparel'
  },
  {
    id: '3',
    name: 'Metal Essentials Vinyl',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&q=80',
    category: 'Music'
  },
];

export default function MerchPage() {
  const { items, addItem, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();
  const [showCart, setShowCart] = useState(false);
  const total = getTotal();
  const itemCount = getItemCount();

  const handleAddToCart = (item: typeof merchItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price.replace('$', '')),
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Merch Store</h1>
        <button
          onClick={() => setShowCart(true)}
          className="relative flex items-center gap-2 bg-spotify-light-gray hover:bg-spotify-light-gray/80 px-4 py-2 rounded-full transition-colors"
        >
          <ShoppingCart size={20} />
          <span>Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-spotify-green text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {merchItems.length === 0 ? (
        <div className="text-center py-24">
          <ShoppingBag className="w-16 h-16 text-spotify-text-gray mx-auto mb-4" />
          <p className="text-spotify-text-gray text-xl font-medium mb-2">No merch available yet</p>
          <p className="text-spotify-text-gray text-sm">Check back soon for exclusive merchandise</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {merchItems.map((item) => (
            <div
              key={item.id}
              className="bg-spotify-light-gray hover:bg-[#3e3e3e] rounded-lg p-4 transition-colors group"
            >
              <div className="relative w-full aspect-square mb-4 rounded overflow-hidden bg-spotify-dark-gray">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              <h3 className="font-semibold text-sm text-white mb-1 truncate">{item.name}</h3>
              <p className="text-xs text-spotify-text-gray mb-2">{item.category}</p>
              <p className="text-spotify-green font-medium mb-3">{item.price}</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-spotify-green hover:bg-spotify-green/80 text-black py-2 rounded-full font-medium text-sm transition-colors"
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
                    <div key={item.id} className="flex items-center gap-4 bg-spotify-light-gray rounded-lg p-4">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-spotify-text-gray">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-spotify-dark-gray rounded hover:bg-spotify-dark-gray/80"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
                <button className="w-full bg-spotify-green hover:bg-spotify-green/80 text-black py-3 rounded-full font-semibold transition-colors">
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