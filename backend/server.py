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
    recipe_ingredients = db.relationship('RecipeIngredient', backref='recipe', lazy=True)

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    stock_quantity = db.Column(db.Float, nullable=False)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    recipes = db.relationship('Recipe', backref='category', lazy=True)
    ingredients = db.relationship('Ingredient', backref='category', lazy=True)

class RecipeIngredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey('ingredient.id'), nullable=False)
    quantity = db.Column(db.Float, nullable=False)

@app.route('/add-category', methods=['POST'])
def add_category():
    data = request.json
    category_name = data.get('nameCategory')  # Use 'nameCategory' as sent from front-end

    try:
        new_category = Category(name=category_name)
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
