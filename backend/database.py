import dataset
import pandas
import json

db = dataset.connect("sqlite:///cook.db")
db["ingredients"]
db['recipes']
db['fav-recipes']

recipies = pandas.read_csv("recipes.csv")
dict_df = json.loads(recipies.to_json(orient="records"))
db["recipes"].insert_many(dict_df)

# dic = {
#     "amount": "2",
#     "ingredient": "orange"
# }

# table.insert(dic)

# table.insert(dict(title="veggies",
#                   ingredients=("\n").join(
#                       ["1 tomato", "1 carrot", "1 cabbage"]),
#                   directions=("\n").join([
#                       'Wash your veggies', 'Chop your veggies', 'Mix']),
#                   link="www.google.com",
#                   source="Gathered",
#                   ner=("\n").join(["tomato", "carrot", "cabbage"])))


# table = db['ingredients']
# table.insert(dict(ingredient="tomato", amount=1))
# table.insert(dict(ingredient="carrot", amount=2))
# table.insert(dict(ingredient="cabbage", amount=3))
