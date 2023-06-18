import { useState, useEffect } from "react";
import axios from "axios";
import foodService from "../../services/food";
import lizardImg from "../../images/lizard.jpeg";

const username: string = "Zack";

const WelcomeBanner = ({ name }: { name: string }) => {
  return (
    <div>
      {/* <img className='absolute z-0'
        style={{
          marginTop:"-1.1rem",
          overflow: "hidden",
        }}
        src={banner}></img> */}

      <h1 className="text-3xl pt-12 font-bold">Welcome back, {name}</h1>
    </div>
  );
};

const ToInputPage = ({ text }: { text: string }) => {
  return (
    <div className="flex p-8">
      <button
        className="btn btn-warning flex-1 rounded-2xl"
        onClick={() => (window.location.href = `/onboard`)}
      >
        {text}
      </button>
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
  const [recipeImage, setRecipeImage] = useState<string | undefined>(
    undefined
  );


  useEffect(() => {
    fetch("http://localhost:5000/get_image?prompt=" + prompt)
      .then((response) => {
        response.text().then((text) => {
          console.log(text);
          setRecipeImage(text);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.title]);

  console.log(recipeImage)
  return (
    <div className="carousel-item w-full lg:w-96 mx-5 lg:mx-0 h-96 relative">
      <figure>
        <img className="rounded-box" src={
            recipeImage !== undefined
            ? "data:image/png;base64," + recipeImage
            : "/placeholder.png"
        }></img>
        <figcaption>{props.title}</figcaption>
      </figure>
    </div>
  );
};

export function HomePage() {
  const [recipes, setRecipes] = useState(new Array());

  useEffect(() => {
    foodService
    .getAllRecipes()
    .then( (returnedRecipes:Array<Object>) => {
      console.log(returnedRecipes);
      setRecipes(returnedRecipes);
    });
  }, []);

  return (
    <div>
      <WelcomeBanner name={username} />
      <ToInputPage text={"Cook you next fridge-clean meal"} />

      <h1 className="text-3xl font-heading pl-12 ">Your Recent Recipes</h1>
      <Recipes recipes={recipes} />
    </div>
  );
}
