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

// CSS
import styles from '../styles/pages/index.module.css'

// Home
export default function Home() {
  
  const [recipe, setRecipe] = useState(""); // Add recipe state
  const [ingredients, setIngredients] = useState([{ ingredient: "", amount: "" }]);

  // Handle changes in input
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [name]: value };
    setIngredients(newIngredients);
  };

  // Ingredient addition
  const handleAddIngredient = () => { setIngredients([...ingredients, { ingredient: "", amount: "" }]); };

  // Ingredient removal
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  // Reset Ingredients
  const resetIngredients = () => { setIngredients([{ ingredient: "", amount: "" }]); };

  // Format ingredients to model trained prompt format (ingredient (amount), ...)
  const formatIngredients = () => { return ingredients.map((ingredient) => `${ingredient.ingredient} (${ingredient.amount})`).join(', '); };

  // Handle submission
  const handleSubmit = async (event) => {

    event.preventDefault(); // Prevent default

    // Message to be sent to model is created 
    const newMessage = {
      role: 'user',
      content: formatIngredients() // Formatted ingredients inputted
    };

    resetIngredients();

    try { // Attempt to send request

      console.log('[User] Requesting recipe generation with ingredient(/s):', formatIngredients())
      const response = await sendMessage(formatIngredients()); // Sends message with formatted ingredients
      const recipe = await response.text() // Recipe is set as response

      console.log('[Website] Recipe received:', recipe);
      setRecipe(recipe);
      
    } catch (error) {
      console.error('[Error]', error)
    }

  }

  // Page
  return (

    <Layout home> {/* Default Layout */}

      <Head>
        <title>AIChef - Home</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
      </Head>

      <center> {/* Center home page elements */}

        {/* Top text section */}
        <section>

          <div className={styles.topSection}>

            <h4>Recipe Generator</h4>
            <p>Generate fantastic recipes using the power of OpenAI. Just input your ingredients and you're good to go!</p>

          </div>

        </section> {/* End of top text section */}

        {/* Input section */}
        <section>

          <div>

            {/* Ingredient and amount forms */}
            <form onSubmit={handleSubmit} class="m-auto p-4">

              {/* JSX element map of ingredients */}
              {ingredients.map((ingredient, index) => (

                // Ingredients
                <div key={index}>

                  {/* Ingredient and amount inputs */}
                  <div>

                    <div class="mb-2"><input type="text" name="ingredient" placeholder="Ingredient" value={ingredient.ingredient} onChange={(event) => handleInputChange(event, index)} /></div> {/* Ingredient input */}

                    <div class="mb-2"><input type="text" name="amount" placeholder="Amount" value={ingredient.amount} onChange={(event) => handleInputChange(event, index)} /></div> {/* Amount of ingredient */}

                  </div>

                  {/* Remove button */}
                  {index !== 0 && ( // Check to see if ingredient is first, otherwise add remove button
                    <button type="button" onClick={() => handleRemoveIngredient(index)}> - </button>
                  )}

                </div>

              ))}

              <div className="form-row">

                {/* Plus button */}
                <div className="col"> <button type="button" onClick={handleAddIngredient} class="btn btn-primary mb-2">+</button> </div>

                {/* Submit button */}
                <div className="col"> <button type="submit" class="btn btn-success">Submit</button> </div>

              </div>

            </form>

          </div>

        </section> {/* End of input section */}
        
        {/* Response section */}
        <section>

          {/* Response */}
          <div>
              {recipe}
          </div>

        </section> {/* End of response section */}

      </center>

    </Layout>

  );
}
