from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/test')
def main_api():
    return jsonify({'test': 'ok'})
