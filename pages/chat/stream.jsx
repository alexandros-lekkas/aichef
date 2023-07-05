import { useState } from 'react';
import { sendMessage } from '../../api/model/chat';
import Layout from '../../components/layout/layout.jsx';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (input.trim() === '') {  
      return;
    }
  
    const newMessage = {
      role: 'user',
      content: input.trim(),
    };
  
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
  
    try {
      const response = await sendMessage(input.trim());
      const responseText = await response.text(); // Convert the response to text
  
      const replyMessage = {
        role: 'assistant',
        content: responseText, // Use the converted response text
      };
  
      setMessages((prevMessages) => [...prevMessages, replyMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  

  return (
    <Layout>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {message.role}: {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </Layout>
  );
}
