from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello():
    return "bruh moment"


@app.route("/recipies")
def recipies():
    return {
        "recipes": [
            {
                "id": 1,
                "title": "Veggie Medley 1",
                "description": "Vegetables are good for you!",
                "source": "NY Times",
            },
            {
                "id": 2,
                "title": "Veggie Medley 2",
                "description": "Vegetables are good for you!",
                "source": "NY Times 2",
            },
            {
                "id": 3,
                "title": "Veggie Medley 3",
                "description": "Vegetables are good for you!",
                "source": "NY Times 3",
            },
        ]
    }


app.run(port=5000, debug=True)
