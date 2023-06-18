from flask import Flask
import dataset
from flask import request

app = Flask(__name__)

db = dataset.connect('sqlite:///cook.db')


@app.route("/")
def hello():
    return "bruh moment"


@app.route("/recipes/<title>")
def recipe(title):
    res = list(db.get_table("recipes").find(title=title))
    if len(res) >= 1:  # there should only be 1 result
        return res[0]
    else:
        return "error"


@app.route("/recipes")
def recipes():
    recipes_table = db.get_table("recipes")
    return list(recipes_table)


@app.post("/recipes")
def add_recipes():
    recipes_table = db.get_table("recipes")
    return list(recipes_table)


def insert_recipe(table):
    """Inserts a recipe and then returns that inserted recipe"""
    table.insert(request.form)
    # when adding data, make everything lower case later


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
    return list(db.get_table('ingredients'))


@app.route("/ingredients/<ingredient>")
def ingredient(ingredient):
    res = list(db.get_table("ingredients").find(ingredient=ingredient))
    if len(res) == 1:  # there should only be 1 result
        return res[0]
    else:
        return "error"


app.run(port=5000, debug=True)
