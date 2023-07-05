//   _____ _           _
//  / ____| |         | |
// | |    | |__   __ _| |_
// | |    | '_ \ / _` | __|
// | |____| | | | (_| | |_
//  \_____|_| |_|\__,_|\__|
//
// Recipe's generated through straight chat answers
// (not using pre-trained model)

// OpenAI Imports
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

// OpebAI Configuration
const config = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(config);
export const runtime = "edge";

// Send Message to OpenAI Function
export async function sendMessage(message) {
    console.log("[Chat] Send message function ran")

    // Message
    const messages = [
        {
            role: "system",
            content: "You are a helpful assistant that provides recipe suggestions",
        },
        {
            role: "user",
            content: message,
        },
    ];

    // Grabbing Streaming Response
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        stream: true,
        messages,
    });

    // Converting into text-friendly stream and returning it
    const stream = OpenAIStream(response);
    console.log('[Chat] Returning response');
    return new StreamingTextResponse(stream);
}
