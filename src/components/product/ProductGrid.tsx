
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Filter, ChevronDown } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  isAiRecommended?: boolean;
  matchScore?: number;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  showFilters?: boolean;
}

const ProductGrid = ({ products, title, showFilters = false }: ProductGridProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Header */}
      {(title || showFilters) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          {title && <h2 className="text-2xl font-heading font-semibold">{title}</h2>}
          
          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button 
                className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm bg-white"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} />
                Filters
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <select className="px-4 py-2 border rounded-md text-sm bg-white">
                <option>Sort By: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Top Rated</option>
                <option>Best Match</option>
              </select>
            </div>
          )}
        </div>
      )}
      
      {/* Filter Panel */}
      {showFilters && isFilterOpen && (
        <div className="bg-white border rounded-md p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
          <div>
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Tops</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Dresses</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Bottoms</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Outerwear</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Size</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>XS</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>S</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>M</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>L</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>XL</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Brand</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Aura Collection</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>ModernLux</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Ethereal</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Urban Chic</span>
              </label>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Price</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Under $50</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>$50 - $100</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>$100 - $200</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>$200+</span>
              </label>
            </div>
          </div>
        </div>
      )}
      
      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            {...product}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
