from flask import Flask, request
import os
import openai
import dataset
from flask_cors import CORS

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
    recipes_table = db.get_table("recipes")
    return list(recipes_table)


@app.post("/recipes")
def add_recipes():
    recipes_table = db.get_table("recipes")
    new_recipes = request.json
    recipes_table.insert_many(new_recipes)
    return new_recipes


def insert_recipe(table):
    """Inserts a recipe and then returns that inserted recipe"""
    table.insert(request.form)
    # when adding data, make everything lower case later


@app.post("/recipes/delete/<title>")
def delete_recipe(title):
    if (db.get_table("recipes").delete(title=title)):
        return f'{title} has been deleted.'
    else:
        return f'{title} has already been deleted/or did not exist.'

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
    ingredients_table.upsert_many(new_ingredients, ['ingredient'])
    return new_ingredients


@app.post("/ingredients/delete/<ingredient>")
def delete_ingredient(ingredient):
    if (db.get_table("ingredients").delete(ingredient=ingredient)):
        return f'{ingredient} has been deleted.'
    else:
        return f'{ingredient} has already been deleted/or did not exist.'


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


app.run(port=5000, debug=True, threaded=False)
