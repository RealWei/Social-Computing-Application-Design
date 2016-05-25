# -*- coding: utf-8 -*-
from flask import Flask
from flask import render_template
import sys
if sys.version_info.major < 3:
    reload(sys)
sys.setdefaultencoding('utf8')

app = Flask(__name__)
@app.route("/")  ##When the URL pattern is "/"
def index():
    return render_template('index.html', requestLogin = 1)


@app.route("/success")
def success():
    return render_template('index.html', success = 1)

if __name__ == "__main__":
    app.debug = True
    app.run()
