import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, CheckCircle, Loader2 } from 'lucide-react';
import { generateCivicResponse } from '../services/gemini';
import './AIGuide.css';

const AIGuide = ({ activeStep, onComplete, hasEarnedStamp }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // When active step changes, reset or push a contextual message
  useEffect(() => {
    if (!activeStep) return;

    const greetStep = async () => {
      setIsTyping(true);
      const greeting = await generateCivicResponse(activeStep);
      setMessages([
        {
          id: Date.now(),
          sender: 'ai',
          text: greeting,
          isIntro: true
        }
      ]);
      setIsTyping(false);
    };

    greetStep();
  }, [activeStep]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const newMessages = [...messages, { id: Date.now(), sender: 'user', text: userText }];
    setMessages(newMessages);
    setIsTyping(true);

    // Call Gemini
    const aiResponse = await generateCivicResponse(activeStep, userText);
    
    setMessages([...newMessages, { id: Date.now() + 1, sender: 'ai', text: aiResponse }]);
    setIsTyping(false);
  };

  return (
    <div className="guide-container">
      <div className="guide-header">
        <div className="guide-avatar">
          <Bot size={24} />
        </div>
        <div className="guide-title">
          <h2>Civic Guide</h2>
          <span className="guide-status">Online • Ready to help</span>
        </div>
      </div>

      <div className="messages-area">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`message-wrapper ${msg.sender}`}
            >
              <div className="message-bubble">
                {msg.text}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="message-wrapper ai"
            >
              <div className="message-bubble typing-indicator">
                <Loader2 className="spinner" size={16} />
                <span>Thinking...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {!hasEarnedStamp && activeStep && (
        <div className="action-area">
          <p className="action-text">Read the info and chat to complete this step.</p>
          <button className="complete-btn" onClick={onComplete}>
            <CheckCircle size={18} />
            <span>Mark Step Complete</span>
          </button>
        </div>
      )}

      <form className="input-area" onSubmit={handleSend}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Ask about ${activeStep?.title}...`}
          disabled={isTyping}
        />
        <button type="submit" disabled={!inputValue.trim() || isTyping} className="send-btn">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AIGuide;
