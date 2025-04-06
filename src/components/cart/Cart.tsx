
import { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'prod-1',
      name: 'Relaxed Fit Cotton T-shirt',
      price: 29.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      size: 'M',
      color: 'White',
    },
    {
      id: 'prod-2',
      name: 'High-Waisted Slim Jeans',
      price: 59.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      size: 'S',
      color: 'Blue',
    },
  ]);
  
  const [recommendations, setRecommendations] = useState([
    {
      id: 'rec-1',
      name: 'Oversized Cotton Blazer',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'rec-2',
      name: 'Canvas Sneakers',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ]);
  
  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const cartElement = document.getElementById('cart-panel');
      const cartButton = document.getElementById('cart-button');
      
      if (
        isOpen && 
        cartElement && 
        !cartElement.contains(target) &&
        cartButton &&
        !cartButton.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Disable scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };
  
  const updateQuantity = (id: string, action: 'increase' | 'decrease') => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: action === 'increase' 
              ? item.quantity + 1 
              : Math.max(1, item.quantity - 1)
          };
        }
        return item;
      })
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  
  const shippingCost = 4.99;
  const total = subtotal + shippingCost;

  return (
    <>
      {/* Cart button already in navbar */}
      
      {/* Cart overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          {/* Cart panel */}
          <div 
            id="cart-panel"
            className="fixed top-0 right-0 h-full bg-white max-w-md w-full shadow-xl flex flex-col animate-fade-in"
            style={{ animation: 'fadeIn 0.3s ease-out, slideInRight 0.3s ease-out' }}
          >
            {/* Cart header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <h2 className="font-heading font-semibold">Your Cart</h2>
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length} items
                </span>
              </div>
              <button 
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Cart body */}
            <div className="flex-grow overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                  <button 
                    onClick={toggleCart}
                    className="bg-teal text-white px-6 py-2 rounded-md hover:bg-teal/90"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Cart items */}
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b">
                        {/* Item image */}
                        <Link to={`/product/${item.id}`} className="w-20 h-24 bg-gray-100 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        
                        {/* Item details */}
                        <div className="flex-grow">
                          <Link to={`/product/${item.id}`} className="font-medium text-gray-800 hover:text-teal">
                            {item.name}
                          </Link>
                          
                          {/* Size and color */}
                          {(item.size || item.color) && (
                            <p className="text-sm text-gray-500 mt-1">
                              {item.size && <span>Size: {item.size}</span>}
                              {item.size && item.color && <span> / </span>}
                              {item.color && <span>Color: {item.color}</span>}
                            </p>
                          )}
                          
                          <div className="flex justify-between items-center mt-2">
                            {/* Quantity */}
                            <div className="flex items-center border rounded">
                              <button 
                                onClick={() => updateQuantity(item.id, 'decrease')}
                                className="px-2 py-1 text-gray-600 hover:text-teal"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-2 text-sm">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 'increase')}
                                className="px-2 py-1 text-gray-600 hover:text-teal"
                                aria-label="Increase quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            
                            {/* Price */}
                            <div>
                              <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Remove button */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-gray-600 self-start mt-1"
                          aria-label="Remove item"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Recommendations */}
                  <div>
                    <h3 className="font-medium mb-3 text-gray-800 flex items-center gap-2">
                      <span className="ai-badge">AI</span> Complete Your Look
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {recommendations.map((item) => (
                        <div key={item.id} className="product-card">
                          <Link to={`/product/${item.id}`} className="block aspect-square overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </Link>
                          <div className="p-2">
                            <Link to={`/product/${item.id}`} className="text-sm font-medium line-clamp-1">
                              {item.name}
                            </Link>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm">${item.price}</p>
                              <button 
                                className="text-xs bg-teal text-white px-2 py-1 rounded"
                                aria-label="Add to cart"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Cart footer */}
            {cartItems.length > 0 && (
              <div className="border-t p-4 bg-gray-50">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-teal text-white py-3 rounded-md font-medium hover:bg-teal/90 transition-colors"
                >
                  Proceed to Checkout
                </button>
                
                <button 
                  onClick={toggleCart}
                  className="w-full text-gray-700 mt-2 py-2 text-sm hover:text-teal transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
