from flask import Flask, render_template, session
import git

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/attractor")
def attractor():
    return render_template("attractor.html")

@app.route("/sperm")
@app.route("/sperm/<mode>")
def sperm(mode="animation"):
    return render_template("sperm.html", mode=mode)

@app.route("/wallpaper")
@app.route("/wallpaper/<mode>")
def wallpaper(mode='arrows'):
    return render_template("wallpaper.html", mode=mode) 

@app.route("/planets")
def planets():
    return render_template("planets.html")

@app.route("/giftwrapping")
def giftwrapping():
    return render_template("giftwrapping.html")

@app.route("/polar")
@app.route("/polar/<animation>")
def polar(animation='peachy'):
    scripts = {
        'peachy': ['peach', 'sketch'],
        'iris': ['circle', 'sketch'],
        'slinky': ['slink', 'sketch'],
        'crinkling_spiral': ['myRotator', 'sketch'],
        'circles': ['sketch'],
        'limacon': ['myRotator', 'sketch'],
        'cardioid': ['myRotator', 'sketch'],
        'eye_spiral': ['myRotator', 'sketch'],
        'limacon2': ['disc', 'myRotator', 'sketch']
    }

    return render_template("polar.html", animation=animation, scripts=scripts[animation])
