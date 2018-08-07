# server.py
from flask import Flask, render_template

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
    return render_template("index.html")

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
if __name__ == "__main__":
  app.run()