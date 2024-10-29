import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProductTemplate = () => {
  const [selectedVariant, setSelectedVariant] = useState('White');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const variants = [
    { name: 'White', selected: true },
    { name: 'Dark', selected: false },
    { name: 'Darker', selected: false },
    { name: 'Even Darker', selected: false },
    { name: 'The Darkest', selected: false }
  ];

  const thumbnails = [
    '/api/placeholder/150/150',
    '/api/placeholder/150/150',
    '/api/placeholder/150/150',
    '/api/placeholder/150/150',
    '/api/placeholder/150/150'
  ];

  const handlePrevImage = () => {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : thumbnails.length - 1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prev => prev < thumbnails.length - 1 ? prev + 1 : 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="flex items-center gap-2 mb-8 text-gray-600">
        <button className="hover:text-black">
          <ArrowLeft size={24} />
        </button>
        <a href="/" className="hover:underline">Home</a>
        <span>/</span>
        <a href="/fashion" className="hover:underline">Fashion</a>
        <span>/</span>
        <span className="text-gray-900">Floral Elegance Tote Bag</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Image Gallery */}
        <div className="relative">
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  className={`w-16 h-16 border rounded-md overflow-hidden 
                    ${currentImageIndex === idx ? 'border-black' : 'border-gray-200'}`}
                  onClick={() => setCurrentImageIndex(idx)}
                >
                  <img
                    src={thumb}
                    alt={`Product thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1">
              <img
                src="/api/placeholder/600/600"
                alt="Floral Elegance Tote Bag"
                className="w-full rounded-lg"
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Floral Elegance Tote Bag</h1>
            <p className="text-2xl">$670.00</p>
          </div>

          {/* Variant Selection */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Select variant</p>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <button
                  key={variant.name}
                  className={`px-4 py-2 rounded-md border ${
                    selectedVariant === variant.name
                      ? 'bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                  onClick={() => setSelectedVariant(variant.name)}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Description */}
          <p className="text-gray-700">
            Embrace timeless style with our Floral Elegance Tote Bag, perfect for adding a touch of sophistication to any outfit. This chic handbag features a vibrant botanical print, a spacious interior for all your essentials, and luxurious hardware accents for a polished finish. Its durable construction ensures lasting quality, making it a must-have accessory for the fashion-forward individual.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <button className="w-full bg-black text-white py-4 rounded-md flex items-center justify-center gap-2">
              <span>Add to Bag</span>
            </button>
            <button className="w-full border border-gray-300 py-4 rounded-md flex items-center justify-center gap-2 hover:border-black">
              <Heart size={20} />
              <span>Favorite</span>
            </button>
          </div>

          {/* Product Details Accordion */}
          <Card>
            <CardHeader className="cursor-pointer">
              <CardTitle className="text-lg">Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>20L capacity</li>
                <li>700W output power</li>
                <li>6 power levels</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductTemplate;