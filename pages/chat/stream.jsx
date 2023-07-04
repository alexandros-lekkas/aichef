import { useState, useEffect } from 'react';

export default function Stream() {
  const [responseChunks, setResponseChunks] = useState([]);
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const chunks = await response.json();
      setResponseChunks((prevChunks) => [...prevChunks, ...chunks]);
    }

    setMessage(''); // Clear the input field after sending the message
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/chat', {
        method: 'GET',
      });

      if (response.ok) {
        const chunks = await response.json();
        setResponseChunks(chunks);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Render the response chunks */}
      {responseChunks.map((chunk, index) => (
        <p key={index}>{chunk}</p>
      ))}

      {/* Input form */}
      <form onSubmit={handleSendMessage}>
        <input type="text" value={message} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
