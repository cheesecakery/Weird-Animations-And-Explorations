from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/attractor")
def attractor():
    return render_template("attractor.html")

@app.route("/sperm")
def sperm():
    b_c = "black"
    return render_template("sperm.html", b_c=b_c)

@app.route("/wallpaper")
def wallpaper():
    return render_template("wallpaper.html")