"""
Routes and views for the api application.
"""

from datetime import datetime
from flask import render_template , jsonify
from PandemicStock import app
import json
import requests
from PandemicStock.pgsql import getApiInfo


@app.route('/table')
def table():
    """Renders the contact page."""
    print("rendering table from python application")
    # get api info from database
    apikey, baseurl = getApiInfo(1)
    queryUrl = baseurl + "&collapse=monthly&api_key="+ apikey
    response = requests.get(queryUrl).json()
    return response

@app.route('/states')
def states():
    """Renders the states page."""
    print("rendering states from python application")
    # get api info from database
    apikey, baseurl = getApiInfo(3)
    #print("states after get api : " + baseurl)
    #response = requests.get(baseurl)
    #print("states response: " + response)

    #payload = {}
    #headers = {'Cookie': '__cfduid=dcdbc85acad85fa96673d13871c927a311585412245'}
    #response = requests.request("GET", baseurl, headers=headers, data = payload).json()
    #response = requests.get(baseurl).json()
    #print(response.text.encode('utf8'))
    #jsonresponse = response.json()
    #print("states response: " + response)
    return baseurl

@app.route('/jhucsse')
def jhucsse():
    """Renders the jhucsse page."""
    print("rendering jhucsse from python application")
    # get api info from database
    apikey, baseurl = getApiInfo(4)
    queryUrl = baseurl 
    response = requests.get(queryUrl).json()
    return response



