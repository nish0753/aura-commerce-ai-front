
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../chatbot/Chatbot';
import Cart from '../cart/Cart';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Chatbot />
      <Cart />
      <Footer />
    </div>
  );
};

export default Layout;
