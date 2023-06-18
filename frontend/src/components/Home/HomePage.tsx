import { useState, useEffect } from "react";
import axios from "axios";
import foodService from "../../services/food";
import lizardImg from "../../images/lizard.jpeg";

const username: string = "Zack";

const WelcomeBanner = ({ name }: { name: string }) => {
  return (
    <div className="flex w-full items-center justify-center py-8">
      <div className="chat chat-end">
        <div className="chat-bubble text-3xl w-64">Let {name} cook!</div>
        <div className="w-16 rounded-full">
          <img src="icon.png" />
        </div>
      </div>
    </div>
  );
};

interface RecipeInterface {
  id?: Number;
  title: String;
  description?: String;
  source?: String;
}

const Recipes = ({ recipes }: { recipes: Array<RecipeInterface> }) => {
  return (
    <div className="carousel carousel-center p-4 space-x-4 rounded-box mb-2 overflow-auto">
      {recipes.map((recipe) => (
        <Recipe title={recipe.title} />
      ))}
    </div>
  );
};

const Recipe = (props: RecipeInterface) => {
  return (
    <div className="carousel-item">
      <figure>
        <img className="rounded-box" src={lizardImg}></img>
        <figcaption>Lizard</figcaption>
      </figure>
    </div>
  );
};

export function HomePage() {
  const [recipes, setRecipes] = useState(new Array());

  useEffect(() => {
    foodService.getAllRecipes().then((returnedRecipes: Array<Object>) => {
      setRecipes(returnedRecipes);
    });
  }, []);

  return (
    <div className="flex flex-col p-5">
      <WelcomeBanner name={username} />

      <div className="flex py-8">
        <button
          className="btn btn-warning flex-1 rounded-2xl"
          onClick={() => (window.location.href = `/onboard`)}
        >
          Cook your next fridge-clean meal
        </button>
      </div>

      <h1 className="text-3xl font-heading items-center">
        Your Recent Recipes
      </h1>
      <Recipes recipes={recipes} />
    </div>
  );
}
