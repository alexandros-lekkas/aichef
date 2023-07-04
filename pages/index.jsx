//  _____           _           
// |_   _|         | |          
//   | |  _ __   __| | _____  __
//   | | | '_ \ / _` |/ _ \ \/ /
//  _| |_| | | | (_| |  __/>  < 
// |_____|_| |_|\__,_|\___/_/\_\

// React
import React, { useState } from 'react';

// Next
import Head from 'next/head';

// Components
import Layout from '../components/layout/layout.jsx';

// API
import { sendMessage } from '../api/model/chat.jsx';

// Home
export default function Home() {
    const [message, setMessage] = useState('');

    // Change value on input
    const handleInputChange = (event) => {
        setMessage(event.target.value); // Set value to response
    };

    // POST to chatGPT on submit
    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(message);
        setMessage('');
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
                <input type="text" value={message} onChange={handleInputChange}/>
                <button type="submit">Send</button>
            </section>
        </Layout>
    );
};