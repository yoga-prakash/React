export default function GetRecipe(props) {
    return (
        <section className="get-recipe-container">
            <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button onClick={props.handler}>Get a recipe</button>
        </section>
    );
};