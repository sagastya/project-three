import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

import pandas as pd
from PandemicStock import app
import os


DATABASE_URL = os.environ.get('DATABASE_URL', '') or "postgres://vvsfwmewzgcqyp:385accacbde1427f81cb04c7bdeb24d7578f239bf4a0a38c71da1819def16d73@ec2-54-157-78-113.compute-1.amazonaws.com:5432/d1gcor427u7djl"
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
db = SQLAlchemy(app)


def getApiInfo(apikey_id):
    print("entering getapiinfo id = [" + str(apikey_id) + "]")
    engine = db.engine
    conn = engine.connect()
    data = pd.read_sql("SELECT * FROM apikey where id=" + str(apikey_id), conn)
    print(data)
    key= data['api_key'][0]
    baseurl = data['base_url'][0]
    print(baseurl)
    return key , baseurl

