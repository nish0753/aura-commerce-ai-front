
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { 
  BarChart3, 
  Users, 
  PieChart, 
  LineChart, 
  Plus, 
  ShoppingBag, 
  Heart, 
  Eye,
  ChevronDown,
  Search,
  ShoppingCart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  UserCog,
  LineChart as LineChartIcon,
  Sparkles,
} from 'lucide-react';

// Mock data for demonstration
const recentUsers = [
  { 
    id: '1', 
    name: 'Alex Johnson', 
    email: 'alex@example.com', 
    lastActive: '2 hours ago',
    interests: ['Minimalist', 'Business Casual'],
    viewedProducts: 12,
    cartItems: 3,
    favorites: 5,
  },
  { 
    id: '2', 
    name: 'Sam Wilson', 
    email: 'sam@example.com', 
    lastActive: '3 hours ago',
    interests: ['Streetwear', 'Athletic'],
    viewedProducts: 8,
    cartItems: 0,
    favorites: 10,
  },
  { 
    id: '3', 
    name: 'Morgan Lee', 
    email: 'morgan@example.com', 
    lastActive: '5 hours ago',
    interests: ['Bohemian', 'Casual Chic'],
    viewedProducts: 15,
    cartItems: 2,
    favorites: 7,
  },
  { 
    id: '4', 
    name: 'Taylor Reed', 
    email: 'taylor@example.com', 
    lastActive: '1 day ago',
    interests: ['Business Casual', 'Minimalist'],
    viewedProducts: 20,
    cartItems: 1,
    favorites: 3,
  },
];

const topProducts = [
  { 
    id: '1', 
    name: 'Oversized Cotton T-Shirt', 
    views: 245, 
    conversions: 32,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  { 
    id: '2', 
    name: 'High-Waisted Slim Jeans', 
    views: 198, 
    conversions: 28,
    image: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  { 
    id: '5', 
    name: 'Floral Print Maxi Dress', 
    views: 176, 
    conversions: 24,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
];

const recentRecommendations = [
  {
    userId: '1',
    userName: 'Alex Johnson',
    products: [
      {
        id: '1',
        name: 'Oversized Cotton T-Shirt',
        match: 95,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      },
      {
        id: '13',
        name: 'Silk Button-Up Shirt',
        match: 89,
        image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      },
    ],
  },
  {
    userId: '2',
    userName: 'Sam Wilson',
    products: [
      {
        id: '17',
        name: 'Leather Ankle Boots',
        match: 93,
        image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      },
      {
        id: '14',
        name: 'Tailored Wool Blazer',
        match: 88,
        image: 'https://images.unsplash.com/photo-1598885511440-218a568ede3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      },
    ],
  },
];

const userJourneys = [
  {
    userId: '1',
    userName: 'Alex Johnson',
    journey: [
      { type: 'view', productId: '1', productName: 'Oversized Cotton T-Shirt', time: '2 hours ago' },
      { type: 'view', productId: '3', productName: 'Relaxed Linen Blazer', time: '2 hours ago' },
      { type: 'cart', productId: '1', productName: 'Oversized Cotton T-Shirt', time: '1 hour ago' },
      { type: 'favorite', productId: '3', productName: 'Relaxed Linen Blazer', time: '1 hour ago' },
      { type: 'view', productId: '4', productName: 'Canvas Sneakers', time: '30 mins ago' },
      { type: 'cart', productId: '4', productName: 'Canvas Sneakers', time: '25 mins ago' },
    ],
  },
  {
    userId: '3',
    userName: 'Morgan Lee',
    journey: [
      { type: 'view', productId: '5', productName: 'Floral Print Maxi Dress', time: '5 hours ago' },
      { type: 'favorite', productId: '5', productName: 'Floral Print Maxi Dress', time: '5 hours ago' },
      { type: 'view', productId: '6', productName: 'Leather Crossbody Bag', time: '4 hours ago' },
      { type: 'view', productId: '8', productName: 'Oversized Sunglasses', time: '4 hours ago' },
      { type: 'cart', productId: '5', productName: 'Floral Print Maxi Dress', time: '3 hours ago' },
      { type: 'cart', productId: '6', productName: 'Leather Crossbody Bag', time: '3 hours ago' },
    ],
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-semibold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Monitor user journeys and AI-powered recommendations
          </p>
        </div>
        
        {/* Tabs */}
        <div className="mb-8 border-b">
          <div className="flex overflow-x-auto">
            <button 
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'text-teal border-b-2 border-teal' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'users' 
                  ? 'text-teal border-b-2 border-teal' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('users')}
            >
              User Journeys
            </button>
            <button 
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'recommendations' 
                  ? 'text-teal border-b-2 border-teal' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('recommendations')}
            >
              AI Recommendations
            </button>
            <button 
              className={`px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'products' 
                  ? 'text-teal border-b-2 border-teal' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Products
            </button>
          </div>
        </div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Total Users</p>
                    <h3 className="text-2xl font-semibold mt-1">1,245</h3>
                    <div className="flex items-center text-green-600 text-sm mt-2">
                      <ArrowUpRight size={14} />
                      <span className="ml-1">12% from last month</span>
                    </div>
                  </div>
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <Users className="text-teal" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Recommendations Shown</p>
                    <h3 className="text-2xl font-semibold mt-1">8,642</h3>
                    <div className="flex items-center text-green-600 text-sm mt-2">
                      <ArrowUpRight size={14} />
                      <span className="ml-1">18% from last month</span>
                    </div>
                  </div>
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <Sparkles className="text-teal" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Conversion Rate</p>
                    <h3 className="text-2xl font-semibold mt-1">14.8%</h3>
                    <div className="flex items-center text-green-600 text-sm mt-2">
                      <ArrowUpRight size={14} />
                      <span className="ml-1">3.2% from last month</span>
                    </div>
                  </div>
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <LineChartIcon className="text-teal" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Total Sales</p>
                    <h3 className="text-2xl font-semibold mt-1">$24,389</h3>
                    <div className="flex items-center text-red-600 text-sm mt-2">
                      <ArrowDownRight size={14} />
                      <span className="ml-1">5% from last month</span>
                    </div>
                  </div>
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <ShoppingCart className="text-teal" size={20} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold">User Activity</h3>
                  <select className="border rounded-md p-1 text-sm">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <LineChart size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Chart visualization would appear here</p>
                    <p className="text-sm mt-2">Showing user sessions, page views, and conversions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold">Recommendation Performance</h3>
                  <select className="border rounded-md p-1 text-sm">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <BarChart3 size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>Chart visualization would appear here</p>
                    <p className="text-sm mt-2">Showing click-through and conversion rates for recommendations</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent users table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="font-semibold">Recent Active Users</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Interest Categories</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Products Viewed</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Cart Items</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Favorites</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-t">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {user.interests.map((interest, i) => (
                              <span 
                                key={i} 
                                className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-full"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <Eye size={14} className="text-gray-400" />
                            <span>{user.viewedProducts}</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <ShoppingBag size={14} className="text-gray-400" />
                            <span>{user.cartItems}</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex items-center justify-center gap-1">
                            <Heart size={14} className="text-gray-400" />
                            <span>{user.favorites}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-500">
                          {user.lastActive}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t text-right">
                <button className="text-teal font-medium hover:underline">
                  View all users
                </button>
              </div>
            </div>
            
            {/* Top products */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="font-semibold">Top Performing Products</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Views</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Conversions</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product) => (
                      <tr key={product.id} className="border-t">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          {product.views}
                        </td>
                        <td className="text-center py-3 px-4">
                          {product.conversions}
                        </td>
                        <td className="text-center py-3 px-4">
                          {((product.conversions / product.views) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t text-right">
                <button className="text-teal font-medium hover:underline">
                  View all products
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* User Journeys Tab */}
        {activeTab === 'users' && (
          <div className="space-y-8">
            {/* Search and filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <div className="flex gap-4">
                  <select className="border rounded-lg px-3 py-2">
                    <option>All activity</option>
                    <option>Product views</option>
                    <option>Cart additions</option>
                    <option>Favorites</option>
                    <option>Purchases</option>
                  </select>
                  <select className="border rounded-lg px-3 py-2">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* User journeys */}
            <div className="space-y-6">
              {userJourneys.map((userJourney) => (
                <div key={userJourney.userId} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="p-6 border-b flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <UserCog size={18} className="text-teal" />
                        {userJourney.userName}'s Journey
                      </h3>
                      <p className="text-sm text-gray-500">User ID: {userJourney.userId}</p>
                    </div>
                    <button className="text-teal hover:text-teal/80">
                      View Full Profile
                    </button>
                  </div>
                  
                  <div className="px-6 py-4">
                    <div className="relative pl-8 border-l-2 border-gray-200">
                      {userJourney.journey.map((event, i) => (
                        <div key={i} className="mb-6 relative">
                          <div className="absolute -left-[25px] bg-white p-1 rounded-full border-2 border-gray-200">
                            {event.type === 'view' && <Eye size={16} className="text-teal" />}
                            {event.type === 'cart' && <ShoppingBag size={16} className="text-coral" />}
                            {event.type === 'favorite' && <Heart size={16} className="text-coral" />}
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex justify-between mb-2">
                              <p className="font-medium">
                                {event.type === 'view' && 'Viewed product'}
                                {event.type === 'cart' && 'Added to cart'}
                                {event.type === 'favorite' && 'Saved to favorites'}
                              </p>
                              <p className="text-sm text-gray-500">{event.time}</p>
                            </div>
                            <Link to={`/product/${event.productId}`} className="text-teal hover:underline">
                              {event.productName}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* AI Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-8">
            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Recommendation Accuracy</p>
                    <h3 className="text-2xl font-semibold mt-1">86%</h3>
                    <div className="flex items-center text-green-600 text-sm mt-2">
                      <ArrowUpRight size={14} />
                      <span className="ml-1">5% from last month</span>
                    </div>
                  </div>
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <Sparkles className="text-teal" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Click-through Rate</p>
                    <h3 className="text-2xl font-semibold mt-1">38%</h3>
                    <div className="flex items-center text-green-600 text-sm mt-2">
                      <ArrowUpRight size={14} />
                      <span className="ml-1">3% from last month</span>
                    </div>
                  </div>
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <LineChartIcon className="text-teal" size={20} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-sm">Conversion Rate</p>
                    <h3 className="text-2xl font-semibold mt-1">12.4%</h3>
                    <div className="flex items-center text-green-600 text-sm mt-2">
                      <ArrowUpRight size={14} />
                      <span className="ml-1">2.1% from last month</span>
                    </div>
                  </div>
                  <div className="bg-accent/20 p-3 rounded-lg">
                    <ShoppingCart className="text-teal" size={20} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Performance chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold">AI Recommendation Performance</h3>
                <select className="border rounded-md p-1 text-sm">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <LineChart size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>Chart visualization would appear here</p>
                  <p className="text-sm mt-2">Tracking accuracy, click-through, and conversion rates over time</p>
                </div>
              </div>
            </div>
            
            {/* Recent recommendations */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="font-semibold">Recent Personalized Recommendations</h3>
              </div>
              
              <div className="p-6 space-y-6">
                {recentRecommendations.map((rec) => (
                  <div key={rec.userId} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{rec.userName}</p>
                          <p className="text-sm text-gray-500">User ID: {rec.userId}</p>
                        </div>
                        <button className="text-sm text-teal hover:underline">
                          View User Profile
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-medium text-gray-600 mb-3">Recommended Products</h4>
                      <div className="space-y-4">
                        {rec.products.map((product) => (
                          <div key={product.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="ai-badge flex items-center gap-1 text-xs">
                                    <Sparkles size={10} /> {product.match}% Match
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Link to={`/product/${product.id}`} className="text-teal hover:underline text-sm">
                              View Product
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t text-right">
                <button className="text-teal font-medium hover:underline">
                  View all recommendations
                </button>
              </div>
            </div>
            
            {/* Recommendation categories */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="font-semibold">Recommendation Categories</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Top Style Categories</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Minimalist</span>
                          <span>28%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-teal h-2 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Business Casual</span>
                          <span>24%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-teal h-2 rounded-full" style={{ width: '24%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Streetwear</span>
                          <span>18%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-teal h-2 rounded-full" style={{ width: '18%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Bohemian</span>
                          <span>16%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-teal h-2 rounded-full" style={{ width: '16%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Athleisure</span>
                          <span>14%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-teal h-2 rounded-full" style={{ width: '14%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">Top Product Categories</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Tops</span>
                          <span>32%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-coral h-2 rounded-full" style={{ width: '32%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Bottoms</span>
                          <span>28%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-coral h-2 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Dresses</span>
                          <span>20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-coral h-2 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Accessories</span>
                          <span>12%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-coral h-2 rounded-full" style={{ width: '12%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Outerwear</span>
                          <span>8%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-coral h-2 rounded-full" style={{ width: '8%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-8">
            {/* Search and actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <div className="flex gap-4">
                  <select className="border rounded-lg px-3 py-2">
                    <option>All categories</option>
                    <option>Tops</option>
                    <option>Bottoms</option>
                    <option>Dresses</option>
                    <option>Accessories</option>
                  </select>
                  <button className="bg-teal text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Plus size={18} />
                    Add Product
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Product</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Price</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Engagement</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...topProducts, 
                      { 
                        id: '4', 
                        name: 'Canvas Sneakers', 
                        views: 165, 
                        conversions: 18,
                        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                      },
                      { 
                        id: '6', 
                        name: 'Leather Crossbody Bag', 
                        views: 132, 
                        conversions: 14,
                        image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
                      },
                    ].map((product, index) => (
                      <tr key={product.id} className="border-t">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {index % 5 === 0 ? 'Tops' : 
                           index % 5 === 1 ? 'Bottoms' : 
                           index % 5 === 2 ? 'Dresses' :
                           index % 5 === 3 ? 'Footwear' : 'Accessories'}
                        </td>
                        <td className="py-3 px-4">
                          ${(29.99 + index * 10).toFixed(2)}
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="inline-flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye size={14} className="text-gray-400" />
                              <span>{product.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ShoppingCart size={14} className="text-gray-400" />
                              <span>{product.conversions}</span>
                            </div>
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            index % 3 === 0 
                              ? 'bg-green-100 text-green-800' 
                              : index % 3 === 1
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {index % 3 === 0 ? 'Active' : index % 3 === 1 ? 'Low Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button className="text-teal hover:text-teal/80 mr-3">
                            Edit
                          </button>
                          <button className="text-gray-500 hover:text-gray-700">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t flex justify-between items-center">
                <p className="text-sm text-gray-500">Showing 5 of 120 products</p>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border rounded-md text-gray-600">
                    Previous
                  </button>
                  <button className="px-3 py-1 border rounded-md bg-navy text-white">
                    1
                  </button>
                  <button className="px-3 py-1 border rounded-md text-gray-600">
                    2
                  </button>
                  <button className="px-3 py-1 border rounded-md text-gray-600">
                    3
                  </button>
                  <button className="px-3 py-1 border rounded-md text-gray-600">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
