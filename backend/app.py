from flask import Flask,request,jsonify
from embedding_main import generate_response
from urllib.parse import unquote
from flask_cors import CORS, cross_origin

app = Flask(__name__)
print("embedding")
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
@cross_origin()
def hello():
    return 'Hello, World!'

@app.route('/ask')
@cross_origin()
def ask_route():
    response = {'status':400,'answer':""}
    url_encoded_question=request.args.get('question')
    print({url_encoded_question})
    if url_encoded_question == '':
        response = {'status':400,'answer':"Please enter some query"}
        return jsonify(response)
    question = unquote(url_encoded_question)
    print(question)
    answer = generate_response(question)
    response = {'status':200,'answer':answer}
    return jsonify(response)