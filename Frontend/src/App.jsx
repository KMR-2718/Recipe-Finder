import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";

function App() {
  // Load search from localStorage
  const [search, setSearch] = useState(() => {
    return localStorage.getItem("search") || "";
  });

  // Load recipes from localStorage
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = localStorage.getItem("recipes");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Save search
  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  // Save recipes
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const searchRecipe = async () => {
    if (!search.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );

      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-5 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
            🍽 Recipe Finder
          </h1>

          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            Discover delicious recipes from around the world in seconds.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-6 md:p-8 border border-gray-100">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSearch={searchRecipe}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>

            <p className="mt-5 text-gray-500 text-lg">
              Searching delicious recipes...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && recipes.length === 0 && (
          <div className="text-center py-24">
            <div className="text-7xl mb-4">👨‍🍳</div>

            <h2 className="text-2xl font-bold text-gray-700">
              Find Your Next Favorite Meal
            </h2>

            <p className="text-gray-500 mt-3">
              Search for pasta, pizza, chicken, cake, burger...
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && recipes.length > 0 && (
          <>
            <div className="flex items-center justify-between mt-12 mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Recipes</h2>

              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold">
                {recipes.length} Results
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {recipes.map((recipe) => (
                <div
                  key={recipe.idMeal}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="cursor-pointer transition duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500 text-white hover:bg-red-600 text-lg"
            >
              ✕
            </button>

            <img
              src={selectedRecipe.strMealThumb}
              alt={selectedRecipe.strMeal}
              className="w-full h-72 object-cover rounded-t-2xl"
            />

            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedRecipe.strMeal}
              </h2>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                  🍴 {selectedRecipe.strCategory}
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  🌍 {selectedRecipe.strArea}
                </span>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                Instructions
              </h3>

              <p className="text-gray-600 leading-7 whitespace-pre-line">
                {selectedRecipe.strInstructions}
              </p>

              {selectedRecipe.strYoutube && (
                <a
                  href={selectedRecipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  ▶ Watch on YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;