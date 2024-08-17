from flask import Flask, render_template, session
import git

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = True

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

@app.route("/wallpaper/<mode>")
def wallpaper(mode):
    return render_template("wallpaper.html", mode=mode) 

@app.route("/planets")
def planets():
    return render_template("planets.html")

@app.route("/giftwrapping")
def giftwrapping():
    return render_template("giftwrapping.html")


@app.route("/polar/<animation>")
def polar(animation):
    return render_template("polar.html", animation=animation)

# @app.route('/webhook', methods=['POST'])
#     def webhook():
#         if request.method == 'POST':
#             repo = git.Repo('./myproject')
#             origin = repo.remotes.origin
#             repo.create_head('master', 
#         origin.refs.master).set_tracking_branch(origin.refs.master).checkout()
#             origin.pull()
#             return '', 200
#         else:
#             return '', 400