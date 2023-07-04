//   _____ _           _   
//  / ____| |         | |  
// | |    | |__   __ _| |_ 
// | |    | '_ \ / _` | __|
// | |____| | | | (_| | |_ 
//  \_____|_| |_|\__,_|\__|     
//
// Recipe's generated through straight chat answers
// (not using pre-trained model)              

// OpenAI
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';

// Create an OpenAI API client
const config = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(config)
const key = process.env.OPENAI_API_KEY;

// Send message to GPT3 function
export async function sendMessage(message) {
    console.log('[Chat] Prompt:', message)
    console.log('Key', key);

    // Array of messages constructed by user array
    const messages = [
        {
            role: 'system',
            content: 'You are a helpful assistant that provides recipe suggestions'
        },
        {
            role: 'user',
            content: message // Message is added from the arguments passed into the function
        }
    ];

    try {
        // Request chat completion from OpenAI using user's prompt
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages
        });
        console.log('[Chat] Response:', response);

        // Reponse handled with appplication logic
        const reply = response.choices[0].message.content;
        console.log('[Chat] Reply:', reply);
    } catch (error) {
        console.error('[Reply]', error)
    }

};