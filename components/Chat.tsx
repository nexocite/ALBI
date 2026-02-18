
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, Message } from '../types';
import { ICONS, COLORS } from '../constants';
import { getGeminiResponse } from '../services/geminiService';

interface ChatViewProps {
  user: UserProfile;
}

const ChatView: React.FC<ChatViewProps> = ({ user }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi ${user.name}, I'm ALBI. I'm tapped into the Albany grid. How can I help you maximize your time downtown today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const context = {
      location: 'Pearl St & State St',
      minutesFree: 45,
      weather: '72°F Sunny',
      nearby: ['Iron Gate Cafe', 'Olde English Pub']
    };

    const aiResponse = await getGeminiResponse(input, user, context);
    
    setIsTyping(false);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: aiResponse || "I missed that part of the grid. Could you say it again?",
      timestamp: new Date()
    }]);
  };

  const templates = [
    "I have 60 minutes, plan something calm",
    "Where is the best coffee nearby?",
    "Tell me a ghost story from downtown",
    "Find a Champion for a food walk"
  ];

  return (
    <div className="flex flex-col h-full bg-black">
      <div className="flex-1 space-y-4 pb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-yellow-500 text-black font-medium rounded-tr-none' 
                : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              <p className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-black' : 'text-neutral-500'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 rounded-tl-none">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="mt-auto space-y-4">
        {messages.length < 3 && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
            {templates.map(t => (
              <button 
                key={t}
                onClick={() => setInput(t)}
                className="whitespace-nowrap bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full text-xs text-neutral-400 hover:border-yellow-500"
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pb-24">
          <input 
            type="text" 
            placeholder="Ask ALBI anything..."
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-yellow-500"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black"
          >
            {ICONS.ArrowRight}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
