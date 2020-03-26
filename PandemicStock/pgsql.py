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


DATABASE_URL = os.environ.get('DATABASE_URL', '') or "postgres://hzwshsxsrawqqs:2be12dc523a3d98d676c8278d557686ba5823c287e177b153c56a62197952635@ec2-52-203-160-194.compute-1.amazonaws.com:5432/db73f0i1h1ehih"
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
db = SQLAlchemy(app)


def getApiInfo(apikey_id):
    print("entering getapiinfo id = [" + getApiInfo + "]")
    engine = db.engine
    conn = engine.connect()
    data = pd.read_sql("SELECT * FROM apikey where id=" + apikey_id, conn)
    print(data)
    key= data['api_key'][0]
    baseurl = data['base_url'][0]
    print(key)
    return key , baseurl

