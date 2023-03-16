import flask
import io
import string
import time
import os
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.metrics.pairwise import cosine_similarity
from ast import literal_eval
from flask import Flask, jsonify, request
from overview import get_itemspredicted
from soup import get_itemspredicted2


def predict_result(title):
    return get_itemspredicted(title)


def predict_result2(title):
    return get_itemspredicted2(title)


app = Flask(__name__)


@app.route('/predict', methods=['POST'])
def predict_overview():
    data = request.args
    # Return on a JSON format
    return jsonify(predict_result(data['Title test']))


@app.route('/predict', methods=['POST'])
def predict_overview():
    data = request.args
    # Return on a JSON format
    return jsonify(predict_result2(data['Title test']))


@app.route('/', methods=['GET'])
def index():
    return "<h1>Welcome</h1>"


# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0')
