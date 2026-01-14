import { useState } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import { Container } from '../ui/Container';
import { Chat } from '../ui/Chat';
import { css } from '@emotion/react';

export const ChatPage = () => {
	const [inputValue, setInputValue] = useState('');
	const { messages, isConnected, sendMessage } =
		useWebSocket('wss://ws.ifelse.io');

	const handleSend = () => {
		if (inputValue.trim() && isConnected) {
			sendMessage(inputValue);
			setInputValue('');
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<Container>
			<Chat
				inputValue={inputValue}
				isConnected={isConnected}
				messages={messages}
				onInputChange={setInputValue}
				onSend={handleSend}
				onKeyPress={handleKeyPress}
			/>
		</Container>
	);
};
