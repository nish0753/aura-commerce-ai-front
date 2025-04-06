
import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Maximize2, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi there! I\'m Aura Assistant. How can I help you with your shopping experience today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, userMsg]);
    setInputValue('');
    
    // Simulate bot response (in a real app, this would call an AI API)
    setTimeout(() => {
      const botResponses = [
        "I'd recommend checking out our new summer collection!",
        "Based on your browsing history, you might like our linen pants.",
        "Would you like me to suggest items that would pair well with your recent purchases?",
        "I can help you find the perfect outfit for any occasion. What are you shopping for?",
        "Our AI styling system has some great recommendations for your style profile."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, botMsg]);
    }, 1000);
  };
  
  // Auto-scroll to bottom of messages when new ones are added
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Chat button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-teal text-white rounded-full p-3 shadow-lg hover:bg-teal/90 transition-all z-40"
        aria-label="Open chat"
      >
        <MessageSquare />
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div 
          className={`fixed bottom-20 right-6 bg-white rounded-lg shadow-xl z-40 transition-all overflow-hidden ${
            isMinimized ? 'h-14 w-72' : 'w-80 sm:w-96'
          }`}
          style={{ maxHeight: isMinimized ? '56px' : 'calc(100vh - 160px)' }}
        >
          {/* Chat header */}
          <div className="bg-navy text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} />
              <h3 className="font-medium">Aura Assistant</h3>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={toggleMinimize} 
                className="p-1 rounded hover:bg-white/10"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
              </button>
              <button 
                onClick={toggleChat} 
                className="p-1 rounded hover:bg-white/10"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Messages container */}
              <div 
                ref={messageContainerRef}
                className="p-3 overflow-y-auto"
                style={{ height: 'calc(100% - 120px)' }}
              >
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`mb-3 max-w-[85%] ${
                      message.sender === 'user' ? 'ml-auto' : 'mr-auto'
                    }`}
                  >
                    <div 
                      className={`p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-teal text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.content}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Input area */}
              <div className="border-t p-3">
                <form 
                  className="flex items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-md"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="bg-teal text-white p-2 rounded-md hover:bg-teal/90"
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
