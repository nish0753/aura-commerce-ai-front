
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/product/ProductGrid';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Shirt, Palette, Heart, Zap } from 'lucide-react';

// Mock API function
const fetchRecommendations = async (preferences: any) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock data
  return [
    {
      id: '101',
      name: 'Tailored Slim Fit Shirt',
      brand: 'ModernLux',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      matchScore: 98,
      isAiRecommended: true,
      tags: ['formal', 'slim-fit', 'office']
    },
    {
      id: '102',
      name: 'Classic Denim Jacket',
      brand: 'UrbanVibe',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      matchScore: 92,
      isAiRecommended: true,
      tags: ['casual', 'denim', 'layering']
    },
    {
      id: '103',
      name: 'Pleated Wide-Leg Trousers',
      brand: 'Aura Collection',
      price: 65.99,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      matchScore: 95,
      isAiRecommended: true,
      tags: ['formal', 'wide-leg', 'pleated']
    },
    {
      id: '104',
      name: 'Oversized Cashmere Sweater',
      brand: 'Ethereal',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      matchScore: 96,
      isAiRecommended: true,
      tags: ['casual', 'oversized', 'winter']
    },
    {
      id: '105',
      name: 'High-Waisted Straight Jeans',
      brand: 'Urban Chic',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      matchScore: 91,
      isAiRecommended: true,
      tags: ['casual', 'denim', 'high-waisted']
    },
    {
      id: '106',
      name: 'Block Heel Ankle Boots',
      brand: 'StreetWave',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      matchScore: 89,
      isAiRecommended: true,
      tags: ['footwear', 'boots', 'winter']
    },
  ];
};

const AiRecommendationsPage = () => {
  const [stylePreferences, setStylePreferences] = useState({
    formalCasual: 50, // 0 = Very Formal, 100 = Very Casual
    classicTrendy: 50, // 0 = Classic, 100 = Trendy
    minimalBold: 50,   // 0 = Minimal, 100 = Bold
    categories: ['tops', 'bottoms', 'dresses', 'outerwear']
  });

  // Query for recommendations
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['recommendations', stylePreferences],
    queryFn: () => fetchRecommendations(stylePreferences),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const handleSliderChange = (name: string, value: number[]) => {
    setStylePreferences(prev => ({
      ...prev,
      [name]: value[0]
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setStylePreferences(prev => {
      const categories = [...prev.categories];
      
      if (categories.includes(category)) {
        return {
          ...prev,
          categories: categories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          categories: [...categories, category]
        };
      }
    });
  };

  const updatePreferences = () => {
    refetch();
  };

  // User style profile based on preferences
  const getStyleProfile = () => {
    let profile = [];
    
    if (stylePreferences.formalCasual < 40) profile.push("Formal");
    else if (stylePreferences.formalCasual > 60) profile.push("Casual");
    else profile.push("Smart Casual");
    
    if (stylePreferences.classicTrendy < 40) profile.push("Classic");
    else if (stylePreferences.classicTrendy > 60) profile.push("Trendy");
    else profile.push("Contemporary");
    
    if (stylePreferences.minimalBold < 40) profile.push("Minimal");
    else if (stylePreferences.minimalBold > 60) profile.push("Bold");
    else profile.push("Balanced");
    
    return profile.join(", ");
  };

  return (
    <Layout>
      <div className="bg-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-teal" size={24} />
            <h1 className="text-3xl md:text-4xl font-heading font-bold">AI-Powered Recommendations</h1>
          </div>
          
          <p className="text-lg text-gray-700 mb-8 max-w-3xl">
            Our advanced AI analyzes your style preferences to recommend products that match your unique taste. Adjust the sliders below to refine your recommendations.
          </p>
          
          <Tabs defaultValue="recommendations" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recommendations">Your Recommendations</TabsTrigger>
              <TabsTrigger value="preferences">Style Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommendations" className="pt-6">
              <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Your Style Profile</h2>
                    <p className="text-gray-600">{getStyleProfile()}</p>
                  </div>
                  <div>
                    <Button onClick={() => refetch()} className="w-full md:w-auto">
                      <Zap className="mr-2 h-4 w-4" /> Refresh Recommendations
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {stylePreferences.categories.map(category => (
                    <Badge key={category} variant="secondary">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow animate-pulse">
                      <div className="h-64 bg-gray-200"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {data && data.length > 0 ? (
                    <ProductGrid products={data} />
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-lg text-gray-600">No recommendations found. Try adjusting your preferences.</p>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="preferences" className="pt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Adjust Your Style Preferences</h2>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Formal</span>
                      <span className="text-sm font-medium">Casual</span>
                    </div>
                    <Slider
                      value={[stylePreferences.formalCasual]}
                      onValueChange={(value) => handleSliderChange('formalCasual', value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Classic</span>
                      <span className="text-sm font-medium">Trendy</span>
                    </div>
                    <Slider
                      value={[stylePreferences.classicTrendy]}
                      onValueChange={(value) => handleSliderChange('classicTrendy', value)}
                      max={100}
                      step={1}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Minimal</span>
                      <span className="text-sm font-medium">Bold</span>
                    </div>
                    <Slider
                      value={[stylePreferences.minimalBold]}
                      onValueChange={(value) => handleSliderChange('minimalBold', value)}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Product Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {['tops', 'bottoms', 'dresses', 'outerwear', 'footwear', 'accessories'].map(category => (
                      <Badge 
                        key={category} 
                        variant={stylePreferences.categories.includes(category) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleCategoryToggle(category)}
                      >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={updatePreferences}
                  size="lg"
                  className="w-full md:w-auto"
                >
                  Update Recommendations
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-heading font-semibold mb-6">How AI-Powered Recommendations Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-accent/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Palette className="text-teal" size={20} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Style Analysis</h3>
            <p className="text-gray-600">
              Our AI analyzes your browsing history, purchases, and preferences to understand your unique style profile.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-accent/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Shirt className="text-teal" size={20} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Product Matching</h3>
            <p className="text-gray-600">
              We match your style profile with thousands of products to find items that complement your wardrobe and taste.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="bg-accent/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Heart className="text-teal" size={20} />
            </div>
            <h3 className="text-lg font-semibold mb-2">Continuous Learning</h3>
            <p className="text-gray-600">
              The more you interact with our platform, the better our recommendations become. Your AI stylist is always learning.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AiRecommendationsPage;
