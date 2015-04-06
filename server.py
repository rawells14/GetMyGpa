from flask import Flask, render_template, request
from sqlhelpers import *
app = Flask(__name__)

     
@app.route('/')
def index():
    return "hello"

@app.route('/signup', methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        insertUser(request.form['username'], request.form['password'])
        return "You just created an account with credentials: " + request.form['username'] + "   " + request.form['password']
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)

