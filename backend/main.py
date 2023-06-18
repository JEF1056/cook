from flask import Flask, request
import os
import openai
import dataset
from flask_cors import CORS
import pandas as pd
from flask import jsonify
from langchain.vectorstores import Pinecone
import pinecone
from langchain.embeddings import OpenAIEmbeddings

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

db = dataset.connect("sqlite:///cook.db")


@app.route("/")
def hello():
    return "bruh moment"


@app.route("/recipes/<title>")
def recipe(title):
    res = list(db.get_table("recipes").find(title=title))
    if len(res) >= 1:  # there should only be 1 result
        return res[0]
    else:
        return


@app.route("/recipes")
def recipes():
    increase = request.args.get("increase")
    if increase is None:
        increase = 0
    else:
        increase = int(increase)
    recipes_table = db.get_table("recipes")
    return list(recipes_table)[20 + increase : 25 + increase]


@app.post("/recipes")
def add_recipes():
    recipes_table = db.get_table("recipes")
    new_recipes = request.json
    recipes_table.insert_many(new_recipes)
    return new_recipes


@app.post("/recipes/delete/<title>")
def delete_recipe(title):
    if db.get_table("recipes").delete(title=title):
        return f"{title} has been deleted."
    else:
        return f"{title} has already been deleted/or did not exist."


# table.insert(dict(title="vegetable medley",
#                   ingredients=("\n").join(
#                       ["1 tomato", "1 carrot", "1 cabbage"]),
#                   directions=("\n").join([
#                       'Wash your veggies', 'Chop your veggies', 'Mix']),
#                   link="www.google.com",
#                   source="Gathered",
#                   ner=("\n").join(["tomato", "carrot", "cabbage"])))


@app.route("/ingredients")
def ingredients():
    return list(db.get_table("ingredients"))


@app.route("/ingredients/<ingredient>")
def ingredient(ingredient):
    res = list(db.get_table("ingredients").find(ingredient=ingredient))
    if len(res) == 1:  # there should only be 1 result
        return res[0]
    else:
        return "error"


@app.post("/ingredients")
def add_ingredients():
    ingredients_table = db.get_table("ingredients")
    new_ingredients = request.json
    ingredients_table.upsert_many(new_ingredients, ["ingredient"])
    return new_ingredients


@app.post("/ingredients/delete/<ingredient>")
def delete_ingredient(ingredient):
    if db.get_table("ingredients").delete(ingredient=ingredient):
        return f"{ingredient} has been deleted."
    else:
        return f"{ingredient} has already been deleted/or did not exist."


@app.route("/fav-recipes/<title>")
def fav_recipe(title):
    res = list(db.get_table("fav-recipes").find(title=title))
    if len(res) >= 1:  # there should only be 1 result
        return res[0]
    else:
        return


@app.route("/fav-recipes")
def fav_recipes():
    recipes_table = db.get_table("fav-recipes")
    return list(recipes_table)


@app.post("/fav-recipes")
def add_fav_recipes():
    recipes_table = db.get_table("fav-recipes")
    new_recipes = request.json
    recipes_table.insert_many(new_recipes)
    return new_recipes


@app.post("/fav-recipes/delete/<title>")
def delete_fav_recipe(title):
    if db.get_table("fav-recipes").delete(title=title):
        return f"{title} has been deleted."
    else:
        return f"{title} has already been deleted/or did not exist."


@app.route("/get_image")
def get_image():
    prompt = request.args.get("prompt")
    if prompt is None:
        return "error: no prompt", 400
    cached_image = db["images"].find_one(prompt=request.args.get("prompt"))
    if cached_image is not None:
        b64 = cached_image["b64_json"]
        db["images"].delete(b64_json=b64)
        print(len(b64))
        return b64
    else:
        response = openai.Image.create(
            prompt=prompt, n=10, size="512x512", response_format="b64_json"
        )

        db["images"].insert_many(
            [
                {"prompt": prompt, "b64_json": resp["b64_json"]}
                for resp in response["data"][1:]
            ]
        )

        return response["data"][0]["b64_json"]


@app.route("/basic_search", methods=["GET"])
def basic_search():
    table = db["ingredients"]
    food_list = [row["ingredient"] for row in table.all()]

    sampled_data = pd.read_csv("recipes.csv")
    sampled_data["food_match_count"] = sampled_data["ingredients"].apply(
        lambda x: sum(food in x for food in food_list)
    )
    sorted_data = sampled_data.sort_values("food_match_count", ascending=False)

    top_10_recipes = []
    for index, row in sorted_data.head(10).iterrows():
        recipe = {
            "title": row["title"],
            "ingredients": row["ingredients"],
            "directions": row["directions"],
            "food_match_count": row["food_match_count"],
        }
        top_10_recipes.append(recipe)

    return jsonify(top_10_recipes)
    # return jsonify(top_10_recipes)


@app.route("/vector_search", methods=["GET"])
def vector_search():
    user_input = request.args.get("query")
    # user_input = 'I want some easy to cook recipes, with beef in it.'
    if user_input is None:
        return "400", 400
    pinecone.init(
        api_key="46ede06d-e66a-4fe1-afe6-edfe6338703e", environment="us-west1-gcp-free"
    )
    index_name = "recipes"
    embeddings = OpenAIEmbeddings()
    docsearch = Pinecone.from_existing_index(index_name, embeddings)
    docs = docsearch.similarity_search(user_input)
    content = []
    for doc in docs:
        content.append(doc.page_content)
    recipe_list = []

    for element in content:
        recipe = {}
        lines = element.split("\n")
        for line in lines:
            if line.startswith("title:"):
                recipe["title"] = line.split(": ", 1)[1]
            elif line.startswith("ingredients:"):
                recipe["ingredients"] = line.split(": ", 1)[1]
            elif line.startswith("directions:"):
                recipe["directions"] = line.split(": ", 1)[1]
        recipe_list.append(recipe)
    return jsonify(recipe_list)


@app.route("/get_description")
def get_description():
    prompt = request.args.get("prompt")
    if prompt is None:
        return "error: no prompt", 400
    p1 = (
        "Generate a witty, interesting, and insightful description of a recipe using this information: "
        + prompt
    )
    response = openai.Completion.create(
        model="text-davinci-001",
        prompt=prompt,
        max_tokens=100,
        temperature=0.8,
    )

    return response["choices"][0]["text"]


app.run(host="0.0.0.0", port=5000, ssl_context="adhoc", debug=True, threaded=False)
