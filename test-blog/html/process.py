from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app)

@app.route('/upload', methods=['POST'])
def receive_data():
    data = request.json  # If the content-type is application/json
    # Or, for form data
    # data = request.form
    print(data["name"])
    with open('allposts.json', 'r') as file:
        f = json.load(file)
    f.append({"name": data["name"], "content": data["content"]})
    with open('allposts.json', 'w') as file:
        json.dump(f, file, indent=4)
        file.close()
    return 'Data received', 200

if __name__ == '__main__':
    app.run(debug=True)