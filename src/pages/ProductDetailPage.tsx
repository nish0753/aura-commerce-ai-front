
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductGrid from '../components/product/ProductGrid';
import { Star, Truck, Heart, ShoppingBag, ArrowRight, Zap, Info, ChevronDown, Sparkles } from 'lucide-react';

const mockProducts = [
  {
    id: '1',
    name: 'Oversized Cotton T-Shirt',
    brand: 'ModernLux',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'A comfortable oversized cotton t-shirt with a relaxed fit. Perfect for casual, everyday wear. Made from 100% organic cotton.',
    details: [
      'Oversized fit',
      '100% organic cotton',
      'Crew neckline',
      'Machine washable',
      'Model is 5\'9" and wears size S'
    ],
    colors: ['White', 'Black', 'Navy', 'Sage'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548864584-83a79e68c519?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613852348851-df1739db8201?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    isAiRecommended: true,
    matchScore: 95
  },
  {
    id: '2',
    name: 'High-Waisted Slim Jeans',
    brand: 'Urban Chic',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    description: 'Classic high-waisted slim jeans with a modern fit. These versatile jeans feature a flattering silhouette and comfortable stretch fabric.',
    details: [
      'High-waisted fit',
      '98% cotton, 2% elastane',
      'Five pocket design',
      'Machine washable',
      'Model is 5\'10" and wears size 27'
    ],
    colors: ['Dark Blue', 'Mid Blue', 'Light Wash', 'Black'],
    sizes: ['24', '25', '26', '27', '28', '29', '30', '31', '32'],
    images: [
      'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608614041984-ca259be519c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    isAiRecommended: true,
    matchScore: 87
  },
];

const outfitSuggestions = [
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
    id: '6',
    name: 'Leather Crossbody Bag',
    brand: 'Urban Chic',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '8',
    name: 'Oversized Sunglasses',
    brand: 'UrbanVibe',
    price: 35.99,
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState<Record<string, boolean>>({
    description: true,
    details: false,
    shipping: false,
  });
  
  // Fetch product data
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.images[0]);
        setSelectedColor(foundProduct.colors[0]);
      }
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const toggleAccordion = (section: string) => {
    setAccordionOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const toggleSizeGuide = () => {
    setSizeGuideOpen(!sizeGuideOpen);
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-6">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-10 bg-gray-200 rounded w-2/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="space-y-3">
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the product you're looking for.
          </p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, i: number) => (
                <div 
                  key={i}
                  className={`aspect-square bg-gray-50 rounded cursor-pointer overflow-hidden ${
                    mainImage === image ? 'ring-2 ring-teal' : ''
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${i+1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            {/* Product basic info */}
            <div className="space-y-4">
              <h5 className="text-gray-500 text-lg">{product.brand}</h5>
              <h1 className="text-3xl font-heading font-semibold">{product.name}</h1>
              
              {/* AI match score */}
              {product.isAiRecommended && (
                <div className="flex items-center gap-2">
                  <span className="ai-badge flex items-center gap-1">
                    <Sparkles size={14} /> {product.matchScore}% Match
                  </span>
                  <span className="text-sm text-gray-600">Based on your style preferences</span>
                </div>
              )}
              
              {/* Price */}
              <div className="text-2xl font-semibold">${product.price.toFixed(2)}</div>
              
              {/* Color selection */}
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Color: {selectedColor}</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-full border ${
                        selectedColor === color ? 'ring-2 ring-teal ring-offset-2' : ''
                      }`}
                      style={{ 
                        backgroundColor: 
                          color === 'White' ? '#ffffff' : 
                          color === 'Black' ? '#000000' :
                          color === 'Navy' ? '#1a2456' :
                          color === 'Sage' ? '#d0d9cb' :
                          color === 'Dark Blue' ? '#0f2654' :
                          color === 'Mid Blue' ? '#2e5076' :
                          color === 'Light Wash' ? '#a4b7cb' :
                          '#888',
                        border: color === 'White' ? '1px solid #e5e7eb' : 'none',
                      }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                      aria-label={`Select ${color} color`}
                    ></button>
                  ))}
                </div>
              </div>
              
              {/* Size selection */}
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">Size</h3>
                  <button 
                    className="text-sm text-teal hover:underline"
                    onClick={toggleSizeGuide}
                    type="button"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      className={`py-2 border rounded-md ${
                        selectedSize === size 
                          ? 'bg-navy text-white' 
                          : 'bg-white hover:border-navy'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size guide modal */}
              {sizeGuideOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-heading font-semibold">Size Guide</h2>
                        <button 
                          onClick={toggleSizeGuide}
                          className="text-gray-500 hover:text-gray-700"
                          aria-label="Close size guide"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="p-3 text-left">Size</th>
                              <th className="p-3 text-left">US</th>
                              <th className="p-3 text-left">Bust (in)</th>
                              <th className="p-3 text-left">Waist (in)</th>
                              <th className="p-3 text-left">Hips (in)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="p-3">XS</td>
                              <td className="p-3">0-2</td>
                              <td className="p-3">32-33</td>
                              <td className="p-3">24-25</td>
                              <td className="p-3">34-35</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3">S</td>
                              <td className="p-3">4-6</td>
                              <td className="p-3">34-35</td>
                              <td className="p-3">26-27</td>
                              <td className="p-3">36-37</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3">M</td>
                              <td className="p-3">8-10</td>
                              <td className="p-3">36-37</td>
                              <td className="p-3">28-29</td>
                              <td className="p-3">38-39</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3">L</td>
                              <td className="p-3">12-14</td>
                              <td className="p-3">38-40</td>
                              <td className="p-3">30-32</td>
                              <td className="p-3">40-42</td>
                            </tr>
                            <tr className="border-t">
                              <td className="p-3">XL</td>
                              <td className="p-3">16-18</td>
                              <td className="p-3">41-43</td>
                              <td className="p-3">33-36</td>
                              <td className="p-3">43-45</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-6 text-sm text-gray-600">
                        <p>Our model is 5'9" and wears size S.</p>
                        <p className="mt-2">Not sure about your size? Contact our customer service team for assistance.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Add to cart & wishlist buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button 
                  className={`flex-grow flex items-center justify-center gap-2 py-3 px-6 rounded-md bg-teal text-white font-medium hover:bg-teal/90 transition-colors ${
                    !selectedSize ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={!selectedSize}
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-6 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
                  <Heart size={18} />
                  Save
                </button>
              </div>
              
              {/* Shipping info */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                <Truck size={16} />
                <span>Free shipping on orders over $75</span>
              </div>
              
              {/* Accordion sections */}
              <div className="mt-8 space-y-4 border-t pt-4">
                {/* Description */}
                <div className="border-b pb-3">
                  <button 
                    className="w-full flex justify-between items-center py-2"
                    onClick={() => toggleAccordion('description')}
                  >
                    <h3 className="font-medium text-lg">Description</h3>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform ${accordionOpen.description ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {accordionOpen.description && (
                    <div className="pt-2 pb-4 text-gray-600">
                      <p>{product.description}</p>
                    </div>
                  )}
                </div>
                
                {/* Product details */}
                <div className="border-b pb-3">
                  <button 
                    className="w-full flex justify-between items-center py-2"
                    onClick={() => toggleAccordion('details')}
                  >
                    <h3 className="font-medium text-lg">Product Details</h3>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform ${accordionOpen.details ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {accordionOpen.details && (
                    <div className="pt-2 pb-4 text-gray-600">
                      <ul className="list-disc pl-5 space-y-1">
                        {product.details.map((detail: string, i: number) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Shipping & returns */}
                <div className="border-b pb-3">
                  <button 
                    className="w-full flex justify-between items-center py-2"
                    onClick={() => toggleAccordion('shipping')}
                  >
                    <h3 className="font-medium text-lg">Shipping & Returns</h3>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform ${accordionOpen.shipping ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  {accordionOpen.shipping && (
                    <div className="pt-2 pb-4 text-gray-600">
                      <p className="mb-2">Free standard shipping on orders over $75. Expedited and international shipping options available at checkout.</p>
                      <p>Free returns within 30 days of delivery. Read our <a href="#" className="text-teal hover:underline">full return policy</a> for more details.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Outfit Matcher Section */}
        <section className="mt-16 bg-accent/20 py-8 px-6 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-heading font-semibold flex items-center gap-2 mb-2">
                <Zap className="text-teal" size={20} />
                Complete the Look
              </h2>
              <p className="text-gray-600">
                AI-curated items that pair perfectly with this {product.name.toLowerCase()}
              </p>
            </div>
            <button className="mt-4 md:mt-0 text-teal hover:text-teal/80 font-medium inline-flex items-center">
              View All <ArrowRight className="ml-1" size={16} />
            </button>
          </div>
          
          <ProductGrid products={outfitSuggestions} />
        </section>
        
        {/* Reviews Section */}
        <section className="mt-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h2 className="text-2xl font-heading font-semibold flex items-center gap-2 mb-2">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      className={star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span>4.2 out of 5</span>
                <span className="text-gray-500">Based on 24 reviews</span>
              </div>
            </div>
            <button className="mt-4 md:mt-0 bg-teal text-white px-4 py-2 rounded-md hover:bg-teal/90 transition-colors">
              Write a Review
            </button>
          </div>
          
          {/* Sample reviews */}
          <div className="space-y-6">
            {[
              {
                name: 'Alex T.',
                date: '2 weeks ago',
                rating: 5,
                title: 'Perfect fit and great material',
                content: 'I\'m absolutely in love with this! The material feels premium and it fits just as expected. Will definitely be purchasing more items.',
              },
              {
                name: 'Jordan M.',
                date: '1 month ago',
                rating: 4,
                title: 'Great quality, slightly large',
                content: 'The quality is excellent - the fabric is soft and seems durable. I found it runs slightly large, so I would recommend sizing down if you\'re between sizes.',
              },
              {
                name: 'Taylor K.',
                date: '2 months ago',
                rating: 4,
                title: 'Versatile addition to my wardrobe',
                content: 'This has quickly become one of my go-to pieces. It\'s versatile and comfortable for all-day wear. The only reason I\'m not giving 5 stars is because the color was slightly different than pictured.',
              },
            ].map((review, i) => (
              <div key={i} className="border-b pb-6">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{review.title}</h3>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={14} 
                        className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span>{review.name}</span>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
                <p className="text-gray-600">{review.content}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="text-teal hover:text-teal/80 font-medium">
              Load More Reviews
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
