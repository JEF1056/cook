import dataset

db = dataset.connect('sqlite:///cook.db')
table = db['recipes']

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