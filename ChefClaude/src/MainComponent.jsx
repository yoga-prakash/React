import { useState } from "react";

export default function MainComponent() {
  const [ingredientList, setIngredient] = useState([]);

  function onSubmition(formData) {
    // event.preventDefault(); // this is used as form refreshes the page so to prevent that.
    // const formData = new FormData(event.currentTarget); // event.currentTarget refers to the element whose event handler is currently executing.
    // in react 19 and above FormData are automatically sent to the handlers and formData.reset() is triggered too.

    const ingredient = formData.get("ingredient");
    const capitalCasedIngredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
    setIngredient((incomingIngredientList) => [
      ...incomingIngredientList,
      capitalCasedIngredient,
    ]);
  }

  return (
    <main>
      <form action={onSubmition} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g Chicken"
          aria-label="add-ingredient"
          name="ingredient"
        />
        <button>Add Ingredient</button>
      </form>
      <section>
        {ingredientList.length > 0 ? (
          <div>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
              {ingredientList.map((ingredient, index) => (
                <li key={`${ingredient}-${index}`}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {/* in React null makes it render nothing or gets left out the element */}
        {/* If we are using ternary instead of && we need wrap the elements inside () to make it return. */}
        {ingredientList.length >= 4 ? (
          <div className="get-recipe-container">
            <div>
              <h3>Ready for a recipe ?</h3>
              <p>Generate a recipe from your list of ingredients</p>
            </div>
            <button>Get a recipe</button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
