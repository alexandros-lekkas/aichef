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
    console.log("[System] Received message:", message)

    // Message
    const messages = [
        {
            role: "system",
            content: "You are a helpful assistant that takes a list of ingredients provided by the user and creates a recipe based on them. You are to use ONLY the ingredients that the user lists and ONLY the amount that is listed for each ingredient (otherwise the user will not be able to make the recipe)! You should not add an ingredients list in the beginning of your response but instead just get into the preparation of the recipe and such with numbered instructions on different lines."
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
    console.log('[System] Returning response:', stream);
    return new StreamingTextResponse(stream);
}
