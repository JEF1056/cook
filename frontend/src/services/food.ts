import axios from 'axios'
const baseUrl = 'http://127.0.0.1:5000'

const getAllIngredients = () => {
    const request = axios.get(`${baseUrl}/ingredients`)
    return request.then(response => response.data)
}

const getAllRecipes = () => {
    console.log('hi')
    const request = axios.get(`${baseUrl}/recipes`)
    return request.then(response => response.data)
}

const addIngredient = (ingredient:string) => {
    // const request = axios.post(baseUrl, )
}


export default { getAllIngredients, addIngredient, getAllRecipes }