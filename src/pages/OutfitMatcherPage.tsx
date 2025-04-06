
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Zap, Shirt, Palette, Lightbulb, Share2, Heart, BookmarkIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Mock product data
const mockProducts = {
  tops: [
    {
      id: 't1',
      name: 'White Button-Up Shirt',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 49.99,
      brand: 'ModernLux'
    },
    {
      id: 't2',
      name: 'Gray Cashmere Sweater',
      image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 89.99,
      brand: 'Ethereal'
    },
    {
      id: 't3',
      name: 'Navy Polo Shirt',
      image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 39.99,
      brand: 'Urban Chic'
    }
  ],
  bottoms: [
    {
      id: 'b1',
      name: 'Black Slim Fit Trousers',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 65.99,
      brand: 'ModernLux'
    },
    {
      id: 'b2',
      name: 'Dark Blue Jeans',
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 59.99,
      brand: 'Urban Chic'
    },
    {
      id: 'b3',
      name: 'Beige Chinos',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 55.99,
      brand: 'StreetWave'
    }
  ],
  footwear: [
    {
      id: 'f1',
      name: 'Brown Leather Oxfords',
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 129.99,
      brand: 'ModernLux'
    },
    {
      id: 'f2',
      name: 'White Sneakers',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 89.99,
      brand: 'StreetWave'
    },
    {
      id: 'f3',
      name: 'Black Chelsea Boots',
      image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 149.99,
      brand: 'Aura Collection'
    }
  ],
  accessories: [
    {
      id: 'a1',
      name: 'Silver Watch',
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 199.99,
      brand: 'ModernLux'
    },
    {
      id: 'a2',
      name: 'Black Leather Belt',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 45.99,
      brand: 'Urban Chic'
    },
    {
      id: 'a3',
      name: 'Patterned Scarf',
      image: 'https://images.unsplash.com/photo-1583395145517-1e3177037600?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 35.99,
      brand: 'Ethereal'
    }
  ]
};

// Mock outfit suggestions
const mockOutfitSuggestions = [
  {
    id: 'outfit1',
    name: 'Business Casual',
    items: [
      mockProducts.tops[0],
      mockProducts.bottoms[0],
      mockProducts.footwear[0],
      mockProducts.accessories[1]
    ],
    matchScore: 95
  },
  {
    id: 'outfit2',
    name: 'Weekend Casual',
    items: [
      mockProducts.tops[2],
      mockProducts.bottoms[1],
      mockProducts.footwear[1]
    ],
    matchScore: 92
  },
  {
    id: 'outfit3',
    name: 'Smart Evening',
    items: [
      mockProducts.tops[1],
      mockProducts.bottoms[0],
      mockProducts.footwear[2],
      mockProducts.accessories[0]
    ],
    matchScore: 88
  }
];

// Mock API call
const fetchOutfitSuggestions = async (selectedItems: any) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mocked data
  return mockOutfitSuggestions;
};

const OutfitMatcherPage = () => {
  const [selectedItems, setSelectedItems] = useState<Record<string, any>>({
    top: null,
    bottom: null,
    footwear: null,
    accessory: null
  });
  
  const [currentOutfit, setCurrentOutfit] = useState<any>(null);
  
  // Query for outfit suggestions
  const { data: outfitSuggestions, isLoading, refetch } = useQuery({
    queryKey: ['outfits', selectedItems],
    queryFn: () => fetchOutfitSuggestions(selectedItems),
    enabled: Object.values(selectedItems).some(item => item !== null),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  
  const handleSelectItem = (category: string, item: any) => {
    const categoryMap: Record<string, string> = {
      tops: 'top',
      bottoms: 'bottom',
      footwear: 'footwear',
      accessories: 'accessory'
    };
    
    setSelectedItems(prev => ({
      ...prev,
      [categoryMap[category]]: prev[categoryMap[category]]?.id === item.id ? null : item
    }));
  };
  
  const calculateTotalPrice = (items: any[]) => {
    return items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };
  
  const handleSaveOutfit = () => {
    toast.success("Outfit saved to your collection!", {
      description: "You can access it anytime from your profile."
    });
  };
  
  const handleShareOutfit = () => {
    toast.success("Outfit sharing link created!", { 
      description: "Link copied to clipboard."
    });
  };
  
  const handleAddAllToCart = (items: any[]) => {
    toast.success(`${items.length} items added to cart!`, {
      description: "You can review your items in the cart."
    });
  };
  
  return (
    <Layout>
      <div className="bg-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="text-teal" size={24} />
            <h1 className="text-3xl md:text-4xl font-heading font-bold">Virtual Outfit Matcher</h1>
          </div>
          
          <p className="text-lg text-gray-700 mb-8 max-w-3xl">
            Mix and match items to create the perfect outfit. Select pieces from different categories and see how they look together.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Item selection */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="tops" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="tops">Tops</TabsTrigger>
                <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
                <TabsTrigger value="footwear">Footwear</TabsTrigger>
                <TabsTrigger value="accessories">Accessories</TabsTrigger>
              </TabsList>
              
              {Object.entries(mockProducts).map(([category, items]) => (
                <TabsContent value={category} key={category} className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {items.map((item) => {
                      const categoryMap: Record<string, string> = {
                        tops: 'top',
                        bottoms: 'bottom',
                        footwear: 'footwear',
                        accessories: 'accessory'
                      };
                      
                      const isSelected = selectedItems[categoryMap[category]]?.id === item.id;
                      
                      return (
                        <div 
                          key={item.id}
                          className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                            isSelected ? 'border-teal ring-2 ring-teal/20' : 'border-gray-200 hover:border-teal/50'
                          }`}
                          onClick={() => handleSelectItem(category, item)}
                        >
                          <div className="aspect-square overflow-hidden bg-gray-100">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-sm text-gray-500">{item.brand}</span>
                              <span className="font-semibold">${item.price}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            
            {/* Outfit Suggestions */}
            {(Object.values(selectedItems).some(item => item !== null)) && (
              <div className="mt-12">
                <h2 className="text-2xl font-heading font-semibold mb-6">
                  <Lightbulb className="inline-block mr-2 text-teal" size={20} />
                  Outfit Suggestions
                </h2>
                
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                        <div className="h-56 bg-gray-200"></div>
                        <div className="p-4 space-y-3">
                          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {outfitSuggestions?.map((outfit) => (
                      <div 
                        key={outfit.id}
                        className="rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setCurrentOutfit(outfit)}
                      >
                        <div className="grid grid-cols-4 h-48">
                          {outfit.items.map((item, index) => (
                            <div key={item.id} className="overflow-hidden bg-gray-50">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium text-lg">{outfit.name}</h3>
                            <Badge variant="secondary" className="bg-accent">
                              {outfit.matchScore}% Match
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {outfit.items.length} items | ${calculateTotalPrice(outfit.items)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Right side - Selected outfit preview */}
          <div>
            <div className="sticky top-24 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h2 className="font-semibold text-lg">Your Outfit</h2>
              </div>
              
              {currentOutfit ? (
                <div>
                  <div className="aspect-square overflow-hidden bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-2 h-full">
                      {currentOutfit.items.slice(0, 4).map((item: any) => (
                        <div key={item.id} className="overflow-hidden border-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{currentOutfit.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="bg-accent">
                        {currentOutfit.matchScore}% Match
                      </Badge>
                      <p className="text-sm font-medium">
                        ${calculateTotalPrice(currentOutfit.items)}
                      </p>
                    </div>
                    
                    <Separator className="mb-4" />
                    
                    <div className="space-y-3 mb-6">
                      {currentOutfit.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span className="font-medium">${item.price}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        className="w-full"
                        onClick={() => handleAddAllToCart(currentOutfit.items)}
                      >
                        Add All to Cart
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={handleSaveOutfit}
                        >
                          <BookmarkIcon className="mr-1 h-4 w-4" /> Save
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={handleShareOutfit}
                        >
                          <Share2 className="mr-1 h-4 w-4" /> Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center text-gray-500">
                  {Object.values(selectedItems).every(item => item === null) ? (
                    <div>
                      <Shirt className="mx-auto mb-3 text-gray-300" size={48} />
                      <p>Select items to build your outfit</p>
                    </div>
                  ) : (
                    <div>
                      <Zap className="mx-auto mb-3 text-teal" size={48} />
                      <p>Choose an outfit suggestion from the left</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-heading font-semibold mb-6">How to Use the Outfit Matcher</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-accent/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="font-bold text-teal">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Select Items</h3>
            <p className="text-gray-600">
              Browse through different categories and choose items that catch your eye.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-accent/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="font-bold text-teal">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">View Suggestions</h3>
            <p className="text-gray-600">
              See outfit suggestions based on your selections and personal style preferences.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-accent/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <span className="font-bold text-teal">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Save or Purchase</h3>
            <p className="text-gray-600">
              Save your favorite outfits to your collection or add all items to your cart for purchase.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OutfitMatcherPage;
