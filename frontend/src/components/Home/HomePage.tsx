import { useState, useEffect } from 'react'
import axios from 'axios'
import foodService from '../../services/food'
import lizardImg from '../../images/lizard.jpeg'
import banner from '../../images/banner.svg'

const username:string = 'Zack'
const baseUrl:string = "http://localhost:3000"

//set to absolute


const WelcomeBanner = ({ name } : {name: string} ) => {
  return (
    <div>
      {/* <img className='absolute z-0'
        style={{
          marginTop:"-1.1rem",
          overflow: "hidden",
        }}
        src={banner}></img> */}

      <h1 className='text-3xl pt-12 font-bold'>Welcome back, {name}</h1>
    </div>
  )
}

const ToInputPage = ({ text } : {text:string}) => {
  return(
    <div className='flex p-8'>
      <button className='btn btn-warning flex-1 rounded-2xl' 
              onClick={() => window.location.href=`${baseUrl}/yeet`}
              >{text}</button>
    </div>
  )
}

const Recipes = ( {recipes} : {recipes: Array<Object>} ) => {
  return <ul>
    {recipes.map(recipe => <Recipe recipe={recipe} />)}
  </ul>
    // return (
    //   <ul>
    //     {ingredients.map(ingredient => <Recipe></Recipe>)}
    //   </ul>
    // )
}

const Recipe = ({ recipe } : {recipe:Object}) => {
  console.log(recipe.title)
  return <li>{recipe.title}</li>
}

export function HomePage() {
  const [recipes, setRecipes] = useState(new Array())

  useEffect(() => {
    foodService
    .getAllRecipes()
    .then( (returnedRecipes:Array<Object>) => {
      console.log('got recipes');
      setRecipes(returnedRecipes);
    })
  }, [])

  return (
    <div>
      <WelcomeBanner name={username}/>
      <ToInputPage text={"Cook you next fridge-clean meal"}/>
      <Recipes recipes={recipes}/>

      <h1 className='text-3xl font-heading pl-12 '>Your Recent Recipes</h1>
      <div className="carousel carousel-center p-4 space-x-4 rounded-box mb-2 overflow-auto">
        <div className="carousel-item">
          <figure>
            <img className='rounded-box' src={lizardImg}></img>
            <figcaption>Lizard</figcaption>
          </figure>
        </div>
        <div className="carousel-item">
          <figure>
            <img className='rounded-box ' src={lizardImg}></img>
            <figcaption>Lizard</figcaption>
          </figure>
        </div>
        <div className="carousel-item">
          <figure>
            <img className='rounded-box max-w-md' src={lizardImg}></img>
            <figcaption>Lizard</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

