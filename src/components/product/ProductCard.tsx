
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  isAiRecommended?: boolean;
  matchScore?: number;
}

const ProductCard = ({
  id,
  name,
  brand,
  price,
  image,
  isAiRecommended = false,
  matchScore,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="product-card relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link to={`/product/${id}`} className="block relative aspect-[3/4] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: isHovered ? 'scale(1.03)' : 'scale(1)' }}
        />
        
        {/* Quick actions that appear on hover */}
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-3 flex justify-between transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button className="text-gray-800 hover:text-coral transition-colors">
            Quick View
          </button>
          <button 
            className="text-gray-800 hover:text-coral transition-colors"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic
            }}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </Link>

      {/* AI Recommendation badge */}
      {isAiRecommended && (
        <div className="absolute top-2 left-2">
          <span className="ai-badge">
            {matchScore ? `${matchScore}% Match` : 'AI Pick'}
          </span>
        </div>
      )}

      {/* Favorite Button */}
      <button 
        className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1.5 shadow-sm"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <Heart 
          size={18} 
          className={isFavorite ? 'fill-coral text-coral' : 'text-gray-600'} 
        />
      </button>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{brand}</p>
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">
          <Link to={`/product/${id}`}>{name}</Link>
        </h3>
        <p className="text-sm font-semibold">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
