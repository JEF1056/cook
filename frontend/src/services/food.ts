import axios from 'axios'
const baseUrl = 'http://localhost:3001/ingredients'

const getAllIngredients = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addIngredient = (ingredient:string) => {
    // const request = axios.post(baseUrl, )
}

export default { getAllIngredients, addIngredient }