import axios from "axios";
const baseUrl = "http://localhost:5000";

const getAllIngredients = () => {
  const request = axios.get(`${baseUrl}/ingredients`);
  return request.then((response) => response.data);
};

const getAllRecipes = () => {
  const request = axios.get(`${baseUrl}/recipes`);

  return request.then((response) => response.data);
};

const addIngredient = (ingredient: string) => {
  // const request = axios.post(baseUrl, )
};

export default { getAllIngredients, addIngredient, getAllRecipes };
