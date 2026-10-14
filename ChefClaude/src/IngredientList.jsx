export default function IngredientList({ ingredientList }) {
    return ingredientList.length > 0 ? (
        <section>
            <ul className="ingredients-list">{ingredientList}</ul>
        </section>
    ) : null;
};