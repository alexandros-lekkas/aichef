//  _____           _
// |_   _|         | |
//   | |  _ __   __| | _____  __
//   | | | '_ \ / _` |/ _ \ \/ /
//  _| |_| | | | (_| |  __/>  <
// |_____|_| |_|\__,_|\___/_/\_\

// React
import React, { useState } from "react";
import { sendMessage } from '../api/model/chat';

// Next
import Head from "next/head";

// Components
import Layout from "../components/layout/layout.jsx";

// Home
export default function Home() {
  const [responseChunks, setResponseChunks] = useState([]);
  const [ingredients, setIngredients] = useState([{ ingredient: "", amount: "" }]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [name]: value };
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredient: "", amount: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  // Format ingredients to model trained prompt format (ingredient (amount), ...)
  const formatIngredients = () => {
    return ingredients.map((ingredient) => `${ingredient.ingredient} (${ingredient.amount})`).join(', ');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Message to be sent to model is created 
    const newMessage = {
      role: 'user',
      content: formatIngredients() // Formatted ingredients inputted
    };

    try { // Attempt to send request

      const response = await sendMessage(formatIngredients()); // Sends message with formatted ingredients
      const recipe = await response.text() // Recipe is set as response

      console.log(recipe);

    } catch (error) {
      console.error('[Error]', error)
    }

  }

  // Page
  return (

    <Layout home> {/* Default Layout */}

      <Head>
        <title>AIChef - Home</title>
      </Head>

      <center> {/* Center home page elements */}

        <section>
          <p>👨‍🍳 OpenAI powered recipe and image generation</p>
        </section>

        <section>

          <div>

            {/* Ingredient and amount forms */}
            <form onSubmit={handleSubmit}>
              {ingredients.map((ingredient, index) => (
                <div key={index}>

                  <input type="text" name="ingredient" placeholder="Ingredient" value={ingredient.ingredient} onChange={(event) => handleInputChange(event, index)} /> {/* Ingredient input */}
                  <input type="text" name="amount" placeholder="Amount" value={ingredient.amount} onChange={(event) => handleInputChange(event, index)} /> {/* Amount of ingredient */}



                  {index !== 0 && (
                    <button type="button" onClick={() => handleRemoveIngredient(index)}>
                      -
                    </button>
                  )}
                </div>
              ))}

              {/* Plus button */}
              <button type="button" onClick={handleAddIngredient}>
                +
              </button>

              {/* Submit button */}
              <button type="submit">Submit</button>

            </form>

            <div>
              {responseChunks.map((chunk, index) => (
                <div key={index}>{chunk.text}</div>
              ))}
            </div>

          </div>

        </section>

      </center>

    </Layout>

  );
}
