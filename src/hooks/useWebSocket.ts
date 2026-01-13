import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'other';
}

export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    
    ws.current.onopen = () => {
      setIsConnected(true);
      console.log('WebSocket connected');
    };
    
    ws.current.onmessage = (event) => {
      try {
        console.log(event.data);
        const data = JSON.parse(event.data);
        if (data && data.message) {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: data.message,
            timestamp: new Date(),
            sender: 'other'
          }]);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };
    
    ws.current.onclose = () => {
      setIsConnected(false);
      console.log('WebSocket disconnected');
    };
    
    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = (text: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ message: text }));
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text,
        timestamp: new Date(),
        sender: 'user'
      }]);
    }
  };

  return { messages, isConnected, sendMessage };
};