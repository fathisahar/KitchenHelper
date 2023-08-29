from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://saharfathi:fathiSahar4321@localhost/kitchen'
db = SQLAlchemy(app)
CORS(app)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    ingredients = db.relationship('Ingredient', secondary='recipe_ingredient', backref='recipes')

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    stock_quantity = db.Column(db.Float, nullable=False)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    categoryType = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    ingredients = db.relationship('Ingredient', backref='category', lazy=True)
    recipes = db.relationship('Recipe', backref='category', lazy=True)

# Association table for many-to-many relationship between Recipe and Ingredient
recipe_ingredient = db.Table(
    'recipe_ingredient',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id'), primary_key=True)
)

@app.route('/add-category', methods=['POST'])
def add_category():
    data = request.json
    category_name = data.get('nameCategory')  
    category_type = data.get('categoryType')

    try:
        new_category = Category(categoryType = category_type, name=category_name)
        db.session.add(new_category)
        db.session.commit()
        return jsonify(message='Category added successfully')
    except Exception as e:
        return jsonify(error=str(e))

@app.route('/add-ingredient', methods=['POST'])
def add_ingredient():
    data = request.json
    ingredient_name = data.get('nameIngredient')
    category_id = data.get('categoryIngredient') 
    stock_quantity = data.get('quantityIngredient') 

    try:
        new_ingredient = Ingredient(name=ingredient_name, category_id=category_id, stock_quantity=stock_quantity)
        db.session.add(new_ingredient)
        db.session.commit()
        return jsonify(message='Ingredient added successfully')
    except Exception as e:
        return jsonify(error=str(e))

@app.route('/add-recipe', methods=['POST'])
def add_recipe():
    data = request.json
    name = data.get('nameRecipe')
    instructions = data.get('instructionsRecipe')  
    category_id = data.get('categoryRecipe')  

    try:
        new_recipe = Recipe(name=name, instructions=instructions, category_id=category_id)
        db.session.add(new_recipe)
        db.session.commit()
        return jsonify(message='Recipe added successfully')
    except Exception as e:
        return jsonify(error=str(e))


    
if __name__ == '__main__':
    app.run(debug=True)
