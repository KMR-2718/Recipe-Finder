function RecipeCard({ recipe }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">

        <h2 className="font-bold text-lg">
          {recipe.strMeal}
        </h2>

        <p className="text-gray-500 mt-2">
          {recipe.strArea}
        </p>

        <p className="text-green-600">
          {recipe.strCategory}
        </p>

      </div>

    </div>
  );
}

export default RecipeCard;