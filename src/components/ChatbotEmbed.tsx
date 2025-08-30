import { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from './ui/Button';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatbotEmbed() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you with creating custom instructions, troubleshooting, or answering questions about the platform. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('template') || input.includes('example')) {
      return "I can help you with templates! Try browsing our Templates & Examples section for pre-built instruction templates like Customer Support, Educational Tutor, or Code Review Assistant. Would you like me to guide you through any specific template?";
    }
    
    if (input.includes('instruction') || input.includes('prompt')) {
      return "For creating effective instructions, I recommend starting with a clear role definition, specific guidelines, and examples. The Instruction Workbench provides AI tools to help refine your content. Would you like tips on any particular aspect?";
    }
    
    if (input.includes('ai tool') || input.includes('sidecar')) {
      return "The AI Sidecar offers 5 powerful tools: Rewrite for clarity, Make RAG-ready, Constrain style/tone, Red-team pass, and Change selected section. Simply select text in the editor and choose a tool to get AI-powered suggestions!";
    }
    
    if (input.includes('collaboration') || input.includes('review')) {
      return "Great question! While the full collaboration features are still in development, you can currently export your instructions and share them with stakeholders. Version control and comment features are coming soon!";
    }
    
    return "I understand you're asking about '" + userInput + "'. I can help with instruction writing, using templates, AI editing tools, or navigating the platform. Could you be more specific about what you'd like to know?";
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-asu-maroon hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-grey-6 bg-asu-maroon text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-arial font-bold text-sm">AI Assistant</h3>
                  <p className="text-xs text-white text-opacity-80">Here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-asu-maroon text-white'
                        : 'bg-grey-6 text-grey-1'
                    }`}
                  >
                    <p className="text-sm font-arial">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isUser ? 'text-white text-opacity-70' : 'text-grey-3'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-grey-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 border border-grey-5 rounded-lg text-sm font-arial focus:outline-none focus:ring-2 focus:ring-asu-maroon focus:border-transparent"
                />
                <Button
                  onClick={handleSend}
                  variant="primary"
                  size="sm"
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
