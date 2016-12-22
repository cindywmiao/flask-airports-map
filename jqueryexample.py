from flask import Flask, jsonify, render_template, request
import math
from flask_bootstrap import Bootstrap
import utils as utils
import pandas

airports = pandas.read_csv("./static/airports.csv", header=None, dtype=str)
airports.columns = ["id", "name", "city", "country", "code", "icao", "latitude", "longitude", "altitude", "offset", "dst", "timezone"]
longitudes = list(airports["longitude"].astype(float))
latitudes = list(airports["latitude"].astype(float))

app = Flask(__name__)
Bootstrap(app)


@app.route('/_add_point')
def add():
    if len(longitudes) != 0:
        random_number = utils.random_int(len(longitudes))
        longitude = longitudes[random_number]
        latitude = latitudes[random_number]
        longitudes.remove(longitude)
        latitudes.remove(latitude)
        return jsonify(x=latitude, y=longitude)
    else:
        return jsonify(x=-1.0, y=-1.0)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
