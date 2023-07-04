//  _____           _
// |_   _|         | |
//   | |  _ __   __| | _____  __
//   | | | '_ \ / _` |/ _ \ \/ /
//  _| |_| | | | (_| |  __/>  <
// |_____|_| |_|\__,_|\___/_/\_\

// React
import React, { useState } from "react";
import { getStreamingResponse } from "../api/model/chat.jsx";

// Next
import Head from "next/head";

// Components
import Layout from "../components/layout/layout.jsx";

// Home
export default function Home() {
  const [responseChunks, setResponseChunks] = useState([]);
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    const messages = [
      {
        role: "system",
        content: "You are a helpful assistant that provides recipe suggestions",
      },
      { role: "user", content: message }, // Replace "message" with the user's input
    ];

    const streamingResponse = await getStreamingResponse(messages);

    let chunk;
    while ((chunk = await streamingResponse.readChunk())) {
      setResponseChunks((prevChunks) => [...prevChunks, chunk]);
    }
  };

  return (
    <Layout home>
      <Head>
        <title>AIChef - Home</title>
      </Head>
      <section>
        <p>👨‍🍳 OpenAI powered recipe and image generation</p>
      </section>
      <section>
        <div>
          {/* Render the response chunks */}
          {responseChunks.map((chunk, index) => (
            <p key={index}>{chunk}</p>
          ))}

          {/* Input form */}
          <form onSubmit={handleSendMessage}>
            <input type="text" />
            <button type="submit">Send</button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
