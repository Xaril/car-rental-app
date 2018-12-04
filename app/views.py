# This file contains all endpoints used by the app.
#
# Author: Fredrik Omstedt
# Date: 2018-12-04

from app import app
from flask import render_template, jsonify, request
import traceback

# Routes the address to show the interface html file
@app.route('/')
@app.route('/index')
def index():
    return render_template('app.html')
