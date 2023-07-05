import { useState } from 'react';
import { sendMessage } from '../api/model/chat';
import Layout from '../components/layout/layout.jsx';
import Head from "next/head";
import { capitalizeFirstLetter } from '../functions/string';

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

      <Head>
        <title>AIChef - Chat</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
      </Head>

      
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
          />
        </label>

        
        <button type="submit" className="btn btn-primary text-white">Send</button>
      </form>
<br></br>
<br></br>
<center>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {capitalizeFirstLetter(message.role)}: {message.content}
          </div>
        ))}
      </div>
      </center>
    </Layout>
  );
}
