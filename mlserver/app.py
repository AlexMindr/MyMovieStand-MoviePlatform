import flask
from flask import Flask, jsonify, request
from overview import get_itemspredicted
from soup import get_itemspredicted2


def predict_result(title):
    return get_itemspredicted(title)
    # return 2


def predict_result2(title):
    return get_itemspredicted2(title)
    # return 'errorr'


app = Flask(__name__)


@app.route('/predict-overview', methods=['POST'])
def predict_overview():
    data = request.args
    return jsonify(predict_result(data['Title']))


@app.route('/predict-soup', methods=['POST'])
def predict_soup():
    data = request.args
    return jsonify(predict_result2(data['Title']))


@app.route('/', methods=['GET'])
def index():
    return "<h1>Welcome</h1>"


if __name__ == '__main__':
    app.run(port=5002)
