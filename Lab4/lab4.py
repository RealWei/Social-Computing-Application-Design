# -*- coding: utf-8 -*-
from flask import Flask
from flask import render_template
import sys
if sys.version_info.major < 3:
    reload(sys)
sys.setdefaultencoding('utf8')

app = Flask(__name__)
@app.route("/") #When the URL pattern is "/"
def index():
    return render_template('index.html')

@app.route('/chart/')
@app.route('/chart/<name1>=<value1>&<name2>=<value2>/')
def chart_view(name1 = None, value1 = 0, name2 = None, value2 = 0):
    return render_template('chart.html', name1=name1, value1=value1, name2=name2, value2=value2)

if __name__ == "__main__":
    app.debug = True
    app.run()
