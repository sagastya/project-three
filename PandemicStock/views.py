"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from PandemicStock import app

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/contact')
def contact():
    """Renders the contact page."""
    return render_template(
        'contact.html',
        title='Contact',
        year=datetime.now().year,
        message='Your contact page.'
    )

@app.route('/plot')
def plot():
    """Renders the contact page."""
    return render_template(
        'plot.html',
        title='Financial Report',
        year=datetime.now().year,
        message='Your Financial report page.'
    )
@app.route('/heat')
def heat():
    """Renders the heat page."""
    return render_template(
        'heat.html',
        title='COVID-19 Heat Map:',
        year=datetime.now().year,
        message='A heat map (graphical representation of data), across state of USA represented as colors'
    )

@app.route('/live-stats')
def livestats():
    """Renders the heat page."""
    return render_template(
        'live-stats.html',
        title='Live Statistics:',
        year=datetime.now().year,
        message='Tracking the number of  coronavirus Cases & Deaths state wide across USA'
    )

@app.route('/stocks')
def stocks():
    """Renders the heat page."""
    return render_template(
        'stocks.html',
        title='Pandemics and Stock Market:',
        year=datetime.now().year,
 
    )

@app.route('/time')
def time():
    """Renders time animation."""
    return render_template(
        'time.html',
        title='Pandemic in Motion:',
        year=datetime.now().year,
         message='Circles size indicates population.'
 
    )

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='Your application description page.'
    )
