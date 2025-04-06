
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/product/ProductGrid';
import { PieChart, Sparkles, LineChart, Zap, Star, Heart } from 'lucide-react';

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Oversized Cotton T-Shirt',
    brand: 'ModernLux',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAiRecommended: true,
    matchScore: 95
  },
  {
    id: '2',
    name: 'High-Waisted Slim Jeans',
    brand: 'Urban Chic',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAiRecommended: true,
    matchScore: 87
  },
  {
    id: '5',
    name: 'Floral Print Maxi Dress',
    brand: 'Ethereal',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAiRecommended: true,
    matchScore: 92
  },
  {
    id: '13',
    name: 'Silk Button-Up Shirt',
    brand: 'Aura Collection',
    price: 65.99,
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAiRecommended: true,
    matchScore: 89
  },
  {
    id: '14',
    name: 'Tailored Wool Blazer',
    brand: 'ModernLux',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1598885511440-218a568ede3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAiRecommended: true,
    matchScore: 91
  },
  {
    id: '15',
    name: 'Canvas Tote Bag',
    brand: 'Urban Chic',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1521508796137-2b0e6086a34b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAiRecommended: true,
    matchScore: 86
  },
  {
    id: '16',
    name: 'Gold Hoop Earrings',
    brand: 'Ethereal',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1631163218355-8987d9c76987?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAiRecommended: true,
    matchScore: 88
  },
  {
    id: '17',
    name: 'Leather Ankle Boots',
    brand: 'UrbanVibe',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    isAiRecommended: true,
    matchScore: 93
  },
];

const RecommendationsPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Sort products by match score
  useEffect(() => {
    setProducts([...mockProducts].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)));
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Page header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-teal" size={24} />
            <h1 className="text-3xl md:text-4xl font-heading font-semibold">Your Personalized Recommendations</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl">
            Our AI has analyzed your style preferences to curate these recommendations just for you. 
            Explore items that match your unique style profile.
          </p>
        </div>
        
        {isLoading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-64 bg-gray-200 rounded-lg"></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-72 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Style Insights */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-12 border border-gray-100">
              <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-2">
                <LineChart size={22} className="text-teal" />
                Your Style Insights
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Style preferences */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                    <Heart size={18} className="text-coral" />
                    Style Preferences
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Minimalist</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-teal h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Casual Chic</span>
                        <span>72%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-teal h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Business Casual</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-teal h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Bohemian</span>
                        <span>38%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-teal h-2 rounded-full" style={{ width: '38%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Color palette */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                    <PieChart size={18} className="text-coral" />
                    Your Color Palette
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      '#1a2456', // Navy
                      '#f8f9fa', // Off-white
                      '#3a7b89', // Teal
                      '#333333', // Charcoal
                      '#d1b48c', // Beige
                      '#6a0572', // Plum
                      '#ff6b6b', // Coral
                      '#4a6fa5', // Steel blue
                      '#dbe7e4', // Light sage
                      '#2d3436', // Dark slate
                    ].map((color, i) => (
                      <div 
                        key={i} 
                        className="aspect-square rounded-full border shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      ></div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Your preferred colors show a preference for neutrals with cool accent tones.
                  </p>
                </div>
                
                {/* Brand affinity */}
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
                    <Star size={18} className="text-coral" />
                    Brand Affinity
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>ModernLux</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={16} 
                            className={star <= 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Urban Chic</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={16} 
                            className={star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Aura Collection</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={16} 
                            className={star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Ethereal</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={16} 
                            className={star <= 3 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products section */}
            <div className="mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-6 flex items-center gap-2">
                <Zap size={22} className="text-teal" />
                Recommended for You
              </h2>
              <ProductGrid products={products} showFilters />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default RecommendationsPage;
