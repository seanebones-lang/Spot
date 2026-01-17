'use client';

import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-spotify-dark text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Merch Store</h1>

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
              <button className="w-full bg-spotify-green hover:bg-spotify-green/80 text-black py-2 rounded-full font-medium text-sm transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}