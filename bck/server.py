from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

x = datetime.datetime.now()

app = Flask(__name__)
CORS(app)

# Sample initial data
user_data = {
    'Name': "geek",
    'Age': "22",
    'Date': x,
    'programming': "python"
}

@app.route('/data', methods=['GET', 'POST'])
def handle_data():
    if request.method == 'GET':
        return jsonify(user_data)
    elif request.method == 'POST':
        # Assuming the POST data is in JSON format
        new_data = request.json

        # Update user_data with new_data
        user_data.update(new_data)

        return jsonify(message="Data updated successfully")

if __name__ == '__main__':
    app.run(debug=True)
