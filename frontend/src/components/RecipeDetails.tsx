import image from "../images/lizard.jpeg"
import { Badge } from 'react-daisyui'
import { useRecoilValue } from 'recoil'
import { recipeDetailState } from "../services/atoms"
const title:string = "Salmon & Spinach Pinwheels"
const description:string = "Yummy delicious fish in wheels."
const ingredients:string = "Fish\nCalamari\nSpinach\nPinwheels\nFish\nCalamari\nSpinach\nPinwheels\nFish\nCalamari\nSpinach\nPinwheels"
const ingredientArray:Array<string> = ingredients.split("\n")

const directions:string = "Fish\nCalamari\nSpinach\nPinwheels\nFish\nCalamari\nSpinach\nPinwheels\nFish\nCalamari\nSpinach\nPinwheels"
const directionArray:Array<string> = directions.split("\n")

interface IngredientsInterface {
    ingredientArray: Array<string>;
}

const Ingredients = () => {
    return (
        <div>
            <h2 className="text-sm font-medium " style={{color:"#598AB7"}}>Ingredients</h2>
            <div className="grid-cols-3">
                {ingredientArray.map(ingredient => <Ingredient ingredient={ingredient}/>)}
            </div>
        </div>
    )
}

interface IngredientInterface {
    ingredient: string
}

const Ingredient = (props:IngredientInterface) => {
    return (
        <li>{props.ingredient}</li>
    )
}

interface DirectionsInterface {
    directionArray: Array<string>;
}


const Directions = () => {
    return (
        <div>
            <h2 className="text-sm font-medium " style={{color:"#598AB7"}}>Directions</h2>
            <ol>{directionArray.map(direction => <Direction direction={direction}/>)}</ol>
        </div>
    )
}   


interface DirectionInterface {
    direction: string;
}

const Direction = (props:DirectionInterface) => {
    return (
        <li>{props.direction}</li>
    )
}

const RecipeDetails = ()=> {
    const recipeDetail = useRecoilValue(recipeDetailState)
    
    const directions:string = recipeDetail.directions
    const directionArray:Array<string> = directions.split("\n")
    const ingredients:string = recipeDetail.ingredients
    const ingredientArray:Array<string> = ingredients.split("\n")
    
    console.log(directions)
    console.log(ingredients)
    
    return (
        <div className="m-4">
            <h1 className="text-2xl font-medium">{title}</h1>
            <h2 className="text-sm font-medium">{description}</h2>
            <Badge color='primary' size="sm" className="text-xs">Fish</Badge>
            <img src={image}
                className="mt-2 rounded-lg ml-auto mr-auto mb-2"></img>
            <div className="w-full text-center font-medium mb-2" 
                style={{
                    borderTop: "2px solid black",
                    borderBottom: "2px solid black" 
                }}>
                    Ready? Set... Go!
            </div>
            <Ingredients/>
            <Directions/>
        </div>
    )
}

export default RecipeDetails;