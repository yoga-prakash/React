import React from "react";
import IngredientList from "./IngredientList.jsx";
import ClaudeRecipe from "./ClaudeRecipe.jsx";
import GetRecipe from "./GetRecipe.jsx";
export default function MainComponent() {

    const [ingredients, setIngredient] = React.useState(["Chicken", "Salsa", "Paneer"]);
    const [isShown, setRecipe] = React.useState(false);

    const newIngredients = ingredients.map((ingredient, index) => <li key={`${ingredient}-${index}`}>{ingredient}</li>)

    function handleForm(formData) {
        const ingredient = formData.get("ingredient");
        const capsIngredient = ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
        setIngredient(prevIngredient => [...prevIngredient, capsIngredient]);
    };

    function getRecipe() {
        setRecipe(true);
    }

    return (
        <section >
            <form action={handleForm} className="add-ingredient-form">
                <input type="text" name="ingredient" placeholder="e.g. Chicken" required />
                <button>Add Ingredient</button>
            </form>
            <IngredientList ingredientList={newIngredients} />
            {newIngredients.length >= 4 && <GetRecipe handler={getRecipe} />}
            {isShown && <ClaudeRecipe />}
        </section>

    );
};