import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen } from 'lucide-react';

const ChatTutor = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your AI tutor. I can help you understand concepts, answer questions, provide explanations, and even quiz you. What topic would you like to learn about today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [currentTopic, setCurrentTopic] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, {
        id: prev.length + 2,
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }]);

      // Extract topic if mentioned
      const topicMatch = input.match(/(?:about|on|learn|study|explain)\s+([^?.,!]+)/i);
      if (topicMatch && !currentTopic) {
        setCurrentTopic(topicMatch[1].trim());
      }
    }, 1000);
  };

  const generateAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes('what is') || lowerInput.includes('explain')) {
      if (lowerInput.includes('machine learning') || lowerInput.includes('ml')) {
        return 'Machine Learning (ML) is a subset of artificial intelligence that enables systems to automatically learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can identify patterns in data and make predictions or decisions. ML algorithms build mathematical models based on training data to make predictions or decisions.\n\nKey types include:\n• Supervised Learning: Learning from labeled data\n• Unsupervised Learning: Finding patterns in unlabeled data\n• Reinforcement Learning: Learning through trial and error';
      }
      if (lowerInput.includes('neural network')) {
        return 'A neural network is a computing system inspired by biological neural networks. It consists of interconnected nodes (neurons) organized in layers. Information flows through the network, with each connection having a weight that adjusts during learning.\n\nComponents:\n• Input Layer: Receives data\n• Hidden Layers: Process information\n• Output Layer: Produces results\n• Weights & Biases: Parameters that are learned';
      }
      return 'That\'s a great question! Let me explain this concept clearly. Based on your query, I can provide a detailed explanation. Would you like me to break it down into simpler terms, or dive deeper into the technical details?';
    }

    if (lowerInput.includes('quiz') || lowerInput.includes('test') || lowerInput.includes('practice')) {
      return 'Great! Let\'s do a quick quiz. Here\'s a question for you:\n\n**Question:** What is the main difference between supervised and unsupervised learning?\n\nA) Supervised learning uses labeled data, unsupervised uses unlabeled data\nB) Supervised learning is faster\nC) They use different programming languages\n\nTake your time to think, and let me know your answer! I\'ll provide feedback and explanation.';
    }

    if (lowerInput.includes('example') || lowerInput.includes('example')) {
      return 'Here\'s a practical example:\n\n**Email Spam Detection** uses supervised learning:\n1. Training data: Thousands of emails labeled as "spam" or "not spam"\n2. Features: Words, sender, subject line patterns\n3. Algorithm learns patterns from labeled examples\n4. New emails are classified based on learned patterns\n\nWould you like more examples or a deeper explanation?';
    }

    if (lowerInput.includes('doubt') || lowerInput.includes('confused') || lowerInput.includes('help')) {
      return 'I\'m here to help clarify your doubts! Could you tell me which specific part is confusing you? I can:\n• Break it down into simpler terms\n• Provide analogies\n• Give step-by-step explanations\n• Show related examples\n\nWhat would be most helpful?';
    }

    return 'That\'s an interesting point! Let me help you understand this better. Based on your question, I can provide:\n\n• A clear explanation of the concept\n• Real-world examples\n• Related topics to explore\n• Practice questions\n\nWhat would you like me to focus on?';
  };

  const quickActions = [
    { label: 'Explain Machine Learning', query: 'What is machine learning?' },
    { label: 'Give me an example', query: 'Can you give me an example?' },
    { label: 'Quiz me', query: 'Can you quiz me on this topic?' },
    { label: 'Simplify this', query: 'Can you simplify this explanation?' }
  ];

  const handleQuickAction = (query) => {
    // Create a synthetic event to pass to handleSend
    const syntheticEvent = {
      preventDefault: () => {}
    };
    setInput(query);
    // Use setTimeout to ensure state is updated, then send
    setTimeout(() => {
      const userMessage = {
        id: messages.length + 1,
        role: 'user',
        content: query,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = generateAIResponse(query);
        setMessages(prev => [...prev, {
          id: prev.length + 2,
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        }]);

        // Extract topic if mentioned
        const topicMatch = query.match(/(?:about|on|learn|study|explain)\s+([^?.,!]+)/i);
        if (topicMatch && !currentTopic) {
          setCurrentTopic(topicMatch[1].trim());
        }
      }, 1000);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AI Chat Tutor</h1>
          </div>
          {currentTopic && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <BookOpen size={16} />
              <span>Current Topic: <span className="font-semibold">{currentTopic}</span></span>
            </div>
          )}
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 250px)', minHeight: '600px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 animate-fade-in ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-darkBlue-600'
                      : 'bg-gradient-to-br from-purple-500 to-purple-600'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="text-white" size={20} />
                  ) : (
                    <Bot className="text-white" size={20} />
                  )}
                </div>
                <div
                  className={`flex-1 rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-darkBlue-600 text-white ml-12'
                      : 'bg-gray-100 text-gray-900 mr-12'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-darkBlue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-500 mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleQuickAction(action.query)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors duration-200"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <form onSubmit={handleSend} className="flex items-center space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question, request an explanation, or ask for a quiz..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-darkBlue-500 focus:border-darkBlue-500 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-3 bg-darkBlue-600 text-white rounded-xl hover:bg-darkBlue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTutor;

