import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/product/ProductGrid';
import { ArrowRight, TrendingUp, Zap, Sparkles, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for products
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
    id: '3',
    name: 'Relaxed Linen Blazer',
    brand: 'Aura Collection',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Canvas Sneakers',
    brand: 'StreetWave',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
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
    id: '6',
    name: 'Leather Crossbody Bag',
    brand: 'Urban Chic',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '7',
    name: 'Wide Leg Trousers',
    brand: 'ModernLux',
    price: 65.99,
    image: 'https://images.unsplash.com/photo-1509551941601-e40ce780a179?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '8',
    name: 'Oversized Sunglasses',
    brand: 'UrbanVibe',
    price: 35.99,
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

const trendingProducts = [
  {
    id: '9',
    name: 'Cropped Cardigan',
    brand: 'Ethereal',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1551163943-3f7359e92b07?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '10',
    name: 'Oversized Denim Jacket',
    brand: 'Urban Chic',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '11',
    name: 'High-Top Sneakers',
    brand: 'StreetWave',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '12',
    name: 'Printed Silk Scarf',
    brand: 'Aura Collection',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1583395145517-1e3177037600?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

const HomePage = () => {
  const [aiRecommendations, setAiRecommendations] = useState(mockProducts.filter(p => p.isAiRecommended));
  
  // Simulate loading of AI recommendations
  const [isAiLoading, setIsAiLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAiLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-br from-navy to-teal text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589465885857-44edb59bbff2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}
        ></div>
        
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
              Discover Your Style with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Personalized recommendations that understand your unique style preferences
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/recommendations" 
                className="bg-white text-navy px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                View Your Recommendations <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link 
                to="/categories" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Recommendation Section */}
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-teal" size={20} />
                <h2 className="text-3xl font-heading font-semibold">For You</h2>
              </div>
              <p className="text-gray-600">Personalized recommendations based on your style preferences</p>
            </div>
            <Link 
              to="/recommendations" 
              className="mt-4 md:mt-0 text-teal hover:text-teal/80 font-medium inline-flex items-center"
            >
              View All <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          
          {isAiLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow animate-pulse-soft">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={aiRecommendations} />
          )}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-semibold mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Tops', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
              { name: 'Accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
            ].map((category, index) => (
              <Link 
                key={index} 
                to={`/categories/${category.name.toLowerCase()}`}
                className="group relative rounded-lg overflow-hidden h-48 md:h-64"
              >
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-white text-xl md:text-2xl font-heading font-semibold">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-coral" size={20} />
              <h2 className="text-3xl font-heading font-semibold">Trending Now</h2>
            </div>
            <Link 
              to="/trending" 
              className="text-teal hover:text-teal/80 font-medium inline-flex items-center"
            >
              View All <ArrowRight className="ml-1" size={16} />
            </Link>
          </div>
          
          <ProductGrid products={trendingProducts} />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-semibold mb-12 text-center">The Aura Experience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/ai-recommendations" className="group">
              <div className="text-center p-6 rounded-lg transition-all hover:bg-accent/20">
                <div className="bg-accent/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal/20 transition-colors">
                  <Sparkles className="text-teal" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h3>
                <p className="text-gray-600">
                  Our advanced AI understands your unique style preferences and recommends products you'll love.
                </p>
              </div>
            </Link>
            
            <Link to="/outfit-matcher" className="group">
              <div className="text-center p-6 rounded-lg transition-all hover:bg-accent/20">
                <div className="bg-accent/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal/20 transition-colors">
                  <Zap className="text-teal" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Virtual Outfit Matcher</h3>
                <p className="text-gray-600">
                  See how items pair together with our smart outfit matcher. Build your perfect look effortlessly.
                </p>
              </div>
            </Link>
            
            <Link to="/style-insights" className="group">
              <div className="text-center p-6 rounded-lg transition-all hover:bg-accent/20">
                <div className="bg-accent/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal/20 transition-colors">
                  <LineChart className="text-teal" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Style Insights</h3>
                <p className="text-gray-600">
                  Gain insights into your style preferences and discover new trends that match your taste.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-semibold mb-4">Join Our Community</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Subscribe for personalized style tips, exclusive offers, and first access to new arrivals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-3 rounded-md flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal"
            />
            <button className="bg-coral hover:bg-coral/90 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
