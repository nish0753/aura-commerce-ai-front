
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/layout/Layout';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Tag, Palette, ArrowRight, TrendingUp, Clock, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock API function
const fetchStyleData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    colorPreferences: [
      { name: 'Blue', value: 35, color: '#3b82f6' },
      { name: 'Black', value: 25, color: '#1f2937' },
      { name: 'White', value: 20, color: '#f9fafb' },
      { name: 'Gray', value: 10, color: '#9ca3af' },
      { name: 'Green', value: 5, color: '#10b981' },
      { name: 'Other', value: 5, color: '#d1d5db' },
    ],
    categoryPreferences: [
      { name: 'Casual', value: 65 },
      { name: 'Formal', value: 20 },
      { name: 'Athletic', value: 10 },
      { name: 'Bohemian', value: 5 },
    ],
    topBrands: [
      { name: 'ModernLux', count: 12 },
      { name: 'Urban Chic', count: 9 },
      { name: 'Ethereal', count: 7 },
      { name: 'StreetWave', count: 5 },
      { name: 'Aura Collection', count: 3 },
    ],
    recentTrends: [
      { trend: 'Oversized Fits', matchScore: 85 },
      { trend: 'Earth Tones', matchScore: 78 },
      { trend: 'Sustainable Materials', matchScore: 92 },
      { trend: 'Vintage Inspired', matchScore: 65 },
      { trend: 'Minimalist Design', matchScore: 90 },
    ],
    styleTags: [
      'Casual', 'Modern', 'Minimal', 'Smart', 'Urban', 'Professional', 
      'Comfortable', 'Versatile', 'Classic', 'Contemporary'
    ],
    shoppingHistory: [
      { month: 'Jan', spent: 120 },
      { month: 'Feb', spent: 85 },
      { month: 'Mar', spent: 200 },
      { month: 'Apr', spent: 75 },
      { month: 'May', spent: 150 },
      { month: 'Jun', spent: 95 },
    ]
  };
};

// Type for style data
type StyleData = {
  colorPreferences: { name: string; value: number; color: string; }[];
  categoryPreferences: { name: string; value: number; }[];
  topBrands: { name: string; count: number; }[];
  recentTrends: { trend: string; matchScore: number; }[];
  styleTags: string[];
  shoppingHistory: { month: string; spent: number; }[];
};

const StyleInsightsPage = () => {
  // Query for style data
  const { data, isLoading } = useQuery<StyleData>({
    queryKey: ['styleInsights'],
    queryFn: fetchStyleData,
    staleTime: 1000 * 60 * 30 // 30 minutes
  });
  
  return (
    <Layout>
      <div className="bg-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <LineChart className="text-teal" size={24} />
            <h1 className="text-3xl md:text-4xl font-heading font-bold">Style Insights</h1>
          </div>
          
          <p className="text-lg text-gray-700 mb-8 max-w-3xl">
            Gain valuable insights into your style preferences and shopping habits. Discover trends that match your taste.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
            <TabsTrigger value="history">Shopping History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Style Profile */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserCheck className="mr-2 text-teal" size={18} />
                    Your Style Profile
                  </CardTitle>
                  <CardDescription>Based on your preferences and purchases</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4">
                        <p className="font-medium text-sm text-gray-500 mb-2">Your Style Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {data?.styleTags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="font-medium text-sm text-gray-500 mb-2">Category Preferences</p>
                        <div className="space-y-2">
                          {data?.categoryPreferences.map((category, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{category.name}</span>
                                <span>{category.value}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-teal h-1.5 rounded-full" 
                                  style={{ width: `${category.value}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Link to="/ai-recommendations">
                        <Button variant="outline" className="w-full">
                          Update Style Preferences
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Color Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="mr-2 text-teal" size={18} />
                    Color Preferences
                  </CardTitle>
                  <CardDescription>Your most worn and preferred colors</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-56 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-4 border-t-teal animate-spin"></div>
                    </div>
                  ) : (
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data?.colorPreferences}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                            label={({name, value}) => `${name}: ${value}%`}
                            labelLine={false}
                          >
                            {data?.colorPreferences.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Top Brands */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="mr-2 text-teal" size={18} />
                    Your Top Brands
                  </CardTitle>
                  <CardDescription>Brands you shop from most frequently</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-3 animate-pulse">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center">
                          <div className="h-4 bg-gray-200 rounded w-32 mr-auto"></div>
                          <div className="h-4 bg-gray-200 rounded w-8"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {data?.topBrands.map((brand, index) => (
                        <div key={index} className="flex items-center justify-between py-1">
                          <span className={index < 3 ? "font-medium" : ""}>{brand.name}</span>
                          <Badge variant={index < 3 ? "default" : "outline"}>
                            {brand.count} items
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trending for You */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 text-teal" size={18} />
                    Trending For You
                  </CardTitle>
                  <CardDescription>Current trends that match your style</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                            <div className="h-3 bg-gray-200 rounded w-20"></div>
                          </div>
                          <div className="h-8 w-16 bg-gray-200 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {data?.recentTrends.map((trend, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-3 border rounded-lg ${
                            trend.matchScore > 85 ? 'border-teal/30 bg-accent/10' : ''
                          }`}
                        >
                          <div>
                            <h3 className="font-medium">{trend.trend}</h3>
                            <p className="text-sm text-gray-500">
                              Match Score: <span className="font-medium">{trend.matchScore}%</span>
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Explore
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Trend Matches */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ArrowRight className="mr-2 text-teal" size={18} />
                    Next Steps
                  </CardTitle>
                  <CardDescription>Recommended actions based on trends</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-3 border rounded-lg">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-full"></div>
                          <div className="h-3 bg-gray-200 rounded w-5/6 mt-1"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-3 border border-teal/30 bg-accent/10 rounded-lg">
                        <h3 className="font-medium mb-1">Try Sustainable Fashion</h3>
                        <p className="text-sm text-gray-600">
                          Based on your interest in Sustainable Materials (92% match), explore our eco-friendly collection.
                        </p>
                        <Button className="w-full mt-3" size="sm">
                          View Collection
                        </Button>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <h3 className="font-medium mb-1">Minimal Style Starter Kit</h3>
                        <p className="text-sm text-gray-600">
                          Your preference for Minimalist Design suggests you'd enjoy our curated minimal wardrobe essentials.
                        </p>
                        <Button variant="outline" className="w-full mt-3" size="sm">
                          See Recommendations
                        </Button>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <h3 className="font-medium mb-1">Complete Your Look</h3>
                        <p className="text-sm text-gray-600">
                          Based on your recent purchases, here are accessories to complete your style.
                        </p>
                        <Button variant="outline" className="w-full mt-3" size="sm">
                          View Accessories
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 text-teal" size={18} />
                    Shopping History
                  </CardTitle>
                  <CardDescription>Your shopping patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-64 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-4 border-t-teal animate-spin"></div>
                    </div>
                  ) : (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={data?.shoppingHistory}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis label={{ value: 'Amount Spent ($)', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="spent" fill="#14b8a6" name="Amount Spent" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Shopping Insights</CardTitle>
                  <CardDescription>Analysis of your purchasing habits</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4 animate-pulse">
                      {[1, 2, 3].map((i) => (
                        <div key={i}>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                          <div className="h-10 bg-gray-200 rounded w-full"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Average Monthly Spend</h3>
                        <p className="text-3xl font-bold">$120.83</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Most Active Month</h3>
                        <p className="text-xl font-semibold">March ($200)</p>
                        <p className="text-sm text-gray-500">65% higher than average</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-2">Shopping Frequency</h3>
                        <div className="flex items-center">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="w-2/3 h-2 bg-teal rounded-full"></div>
                          </div>
                          <span className="text-sm font-medium">Medium</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">You shop 2-3 times per month</p>
                      </div>
                      
                      <div>
                        <Button variant="outline" className="w-full">
                          View Detailed History
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StyleInsightsPage;
