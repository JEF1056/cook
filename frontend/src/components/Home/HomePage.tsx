import { useState, useEffect } from "react";
import axios from "axios";
import foodService from "../../services/food";
import lizardImg from "../../images/lizard.jpeg";
import RecipesComponent from "../RecipesComponent";
import mascot from "../../images/mascot.png"
import welcomeBubble from "frontend/src/images/Welcome Circle.jpg"

const username: string = "Zack";


const WelcomeBanner = ({ name }: { name: string }) => {
  return (
    <div className="flex w-full items-center justify-center py-8">
      <div className="chat chat-end">
        <div className="chat-header font-bold text-3xl p-8">Welcome back, chef</div>
        <div className="chat-bubble text-3xl w-64 ">Let {name} cook!</div>
        <div className="w-36 rounded-full">
          <img src={mascot}/>
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
        <RecipesComponent title={recipe.title} />
      ))}
    </div>
  );
};

// const Recipe = (props: RecipeInterface) => {
//   const [recipeImage, setRecipeImage] = useState<string | undefined>(
//     undefined
//   );


//   useEffect(() => {
//     fetch("http://localhost:5000/get_image?prompt=" + prompt)
//       .then((response) => {
//         response.text().then((text) => {
//           console.log(text);
//           setRecipeImage(text);
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [props.title]);

//   console.log(recipeImage)
//   return (
//     <div className="carousel-item w-full lg:w-96 mx-5 lg:mx-0 h-96 relative">
//       <figure>
//         <img className="rounded-box" src={
//             recipeImage !== undefined
//             ? "data:image/png;base64," + recipeImage
//             : "/placeholder.png"
//         }></img>
//         <figcaption>{props.title}</figcaption>
//       </figure>
//     </div>
//   );
// };

export function HomePage() {
  const [recipes, setRecipes] = useState(new Array());

  useEffect(() => {
    foodService.getAllFavRecipes().then((returnedRecipes: Array<Object>) => {
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
