
import { css } from '@emotion/react';
import { Input } from './Input';
import { Button } from './Button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

interface ChatProps {
  inputValue: string;
  isConnected: boolean;
  messages: Message[];
  onInputChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const Chat = ({
  inputValue,
  isConnected,
  messages,
  onInputChange,
  onSend,
  onKeyPress
}: ChatProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: calc(100vh - 120px);
        max-width: 800px;
        margin: 0 auto;
      `}
    >
      <div
        css={theme => css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${theme.spacing(2)} 0;
          border-bottom: 1px solid ${theme.colors.border};
        `}
      >
        <h1
          css={theme => css`
            margin: 0;
            font-size: ${theme.typography.fontSize.xl};
            color: ${theme.colors.textPrimary};
          `}
        >
          Chat
        </h1>
        <div
          css={theme => css`
            display: flex;
            align-items: center;
            gap: ${theme.spacing(1)};
            font-size: ${theme.typography.fontSize.sm};
            color: ${isConnected ? theme.colors.success : theme.colors.error};
          `}
        >
          <span
            css={css`
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: ${isConnected ? '#4caf50' : '#f44336'};
            `}
          />
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>
      
      <div
        css={theme => css`
          flex: 1;
          overflow-y: auto;
          padding: ${theme.spacing(2)};
          display: flex;
          flex-direction: column;
          background-color: ${theme.colors.backgroundSecondary};
          gap: ${theme.spacing(2)};
          
          /* Стилизация скроллбара */
          &::-webkit-scrollbar {
            width: 8px;
          }
          
          &::-webkit-scrollbar-track {
            background: ${theme.colors.background};
            border-radius: 4px;
          }
          
          &::-webkit-scrollbar-thumb {
            background: ${theme.colors.border};
            border-radius: 4px;
            
            &:hover {
              background: ${theme.colors.textSecondary};
            }
          }
        `}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            css={css`
              display: flex;
              justify-content: ${message.sender === 'user' ? 'flex-end' : 'flex-start'};
            `}
          >
            <div
              css={theme => css`
                max-width: 70%;
                padding: ${theme.spacing(1.5)};
                border-radius: ${theme.borderRadius.medium};
                background-color: ${message.sender === 'user'
                  ? theme.colors.accent
                  : theme.colors.backgroundCard};
                color: ${message.sender === 'user'
                  ? theme.colors.textInverse
                  : theme.colors.textPrimary};
                word-wrap: break-word;
                box-shadow: ${theme.shadows.card};
              `}
            >
              {message.text}
              <div
                css={theme => css`
                  font-size: ${theme.typography.fontSize.xs};
                  color: ${message.sender === 'user' 
                    ? 'rgba(255, 255, 255, 0.7)' 
                    : theme.colors.textTertiary};
                  text-align: right;
                  margin-top: ${theme.spacing(0.5)};
                `}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={(el) => {
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }} />
      </div>
      
      <div
        css={theme => css`
          display: flex;
          gap: ${theme.spacing(1.5)};
          padding: ${theme.spacing(2)} 0;
        `}
      >
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyPress}
          placeholder="Type a message..."
          disabled={!isConnected}
          css={css`
            flex: 1;
          `}
        />
        <Button 
          onClick={onSend} 
          disabled={!isConnected || !inputValue.trim()}
          variant="primary"
        >
          Send
        </Button>
      </div>
    </div>
  );
};
