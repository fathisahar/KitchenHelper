from flask import Flask
from flask_cors import CORS
#from flask_sqlalchemy import SQLAlchemy
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://saharfathi:fathiSahar4321@localhost/food'
#db = SQLAlchemy(app)
CORS(app)

# Route for seeing a data
@app.route('/data')
def get_time():

	# Returning an api for showing in reactjs
	return {
		'Name':"geek",
		"Age":"22",
		"Date":x,
		"programming":"python"
		}

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)
