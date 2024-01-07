from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import or_
from sqlalchemy import Column, Integer, String, Text, ForeignKey, Table
from sqlalchemy.orm import relationship

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://saharfathi:fathiSahar4321@localhost/kitchen'
db = SQLAlchemy(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    ingredients = db.relationship('Ingredient', secondary='recipe_ingredient', backref='recipes')
    ingredient_ids = db.Column(db.String(255))  # Change the data type if needed

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    stock_quantity = db.Column(db.Float, nullable=False)
    stock_type = db.Column(db.String(255), nullable=False)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    categoryType = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    ingredients = db.relationship('Ingredient', backref='category', lazy=True)
    recipes = db.relationship('Recipe', backref='category', lazy=True)

recipe_ingredient = db.Table(
    'recipe_ingredient',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id'), primary_key=True)
)

@app.route('/api/get-categories', methods=['GET'])
def get_categories():
    try:
        categories = Category.query.all()
        category_list = [{'id': category.id, 'type': category.categoryType, 'name': category.name} for category in categories]
        return jsonify(categories=category_list)
    except SQLAlchemyError as e:
        return jsonify(error=str(e))

@app.route('/api/get-ingredients', methods=['GET'])
def get_ingredients():
    try:
        ingredients = Ingredient.query.all()
        ingredient_list = [{'id': ingredient.id, 'name': ingredient.name, 'category_id': ingredient.category_id, 'stock_quantity': ingredient.stock_quantity, 'stock_type': ingredient.stock_type} for ingredient in ingredients]
        return jsonify(ingredients=ingredient_list) 
    except SQLAlchemyError as e:
        return jsonify(error=str(e))
    

@app.route('/api/get-ingredient-categories', methods=['GET'])
def get_ingredient_categories():
    try:
        categories = db.session.execute(db.select(Category)
                .filter_by(categoryType='ingredient')
                .order_by(Category.categoryType)).scalars()

        category_names = [category.name for category in categories]
        
        return jsonify(categories=category_names)
    except Exception as e:
        return jsonify(error=str(e))
    
from flask import jsonify

@app.route('/api/add-ingredient', methods=['POST'])
def add_ingredient():
    data = request.json

    ingredient_name = data['name']
    category_id = data['category']
    stock_quantity = data['quantity']
    stock_type = data['type']

    try:
        new_ingredient = Ingredient(
            name=ingredient_name,
            category_id=category_id,
            stock_quantity=stock_quantity,
            stock_type=stock_type
        )
        db.session.add(new_ingredient)
        db.session.commit()

        return jsonify(message='Ingredient added successfully')
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route('/api/add-category', methods=['POST'])
def add_category():
    data = request.json
    category_name = data.get('name')  
    category_type = data.get('type')

    try:
        new_category = Category(categoryType = category_type, name=category_name)
        db.session.add(new_category)
        db.session.commit()
        return jsonify(message='Category added successfully')
    except Exception as e:
        return jsonify(error=str(e))

@app.route('/api/delete-category', methods=['POST'])
def delete_category():
    data = request.json
    categoryToModify = data.get('name')  

    try:
        categoryToDelete = Category.query.filter(Category.name == categoryToModify).first()
        if categoryToDelete:
            db.session.delete(categoryToDelete)
            db.session.commit()
            return jsonify(message='Category deleted successfully')

    except SQLAlchemyError as e:
        db.session.rollback()  
        return jsonify(error=str(e))
    except Exception as e:
        return jsonify(error=str(e))
    
@app.route('/api/delete-ingredient', methods=['POST'])
def delete_ingredient():
    data = request.json
    ingredientToModify = data.get('name')  

    try:
        ingredientToDelete = Ingredient.query.filter(Ingredient.name == ingredientToModify).first()
        if ingredientToDelete:
            db.session.delete(ingredientToDelete)
            db.session.commit()
            return jsonify(message='Ingredient deleted successfully')

    except SQLAlchemyError as e:
        db.session.rollback()  
        return jsonify(error=str(e))
    except Exception as e:
        return jsonify(error=str(e))

@app.route('/api/modify-category', methods=['POST'])
def modify_category():
    data = request.json
    categoryToModify = data.get('categoryToModify')  
    categoryNewName = data.get('categoryNewName')

    try:
        category = Category.query.filter(Category.name == categoryToModify).first()
        category.name = categoryNewName
        db.session.commit()
        return jsonify(message='Category modified successfully')
    except SQLAlchemyError as e:
        db.session.rollback()  
        return jsonify(error=str(e))
    except Exception as e:
        return jsonify(error=str(e))
    
@app.route('/api/modify-ingredient', methods=['POST'])
def modify_ingredient():
    data = request.json
    oldId = data.get('id')
    newName = data.get('name')  
    newQuantity = data.get('quantity')
    newQuantityType = data.get('type')
    newCategory = data.get('category')

    try:
        ingredient = Ingredient.query.filter(Ingredient.id == oldId).first()
        ingredient.name = newName
        ingredient.category_id = newCategory
        ingredient.stock_quantity = newQuantity
        ingredient.stock_type = newQuantityType
        db.session.commit()
        return jsonify(message='Ingredient modified successfully')
    except SQLAlchemyError as e:
        db.session.rollback()  
        return jsonify(error=str(e))
    except Exception as e:
        return jsonify(error=str(e))

@app.route('/api/update-ingredient-quantity/<int:ingredient_id>', methods=['POST'])
def update_ingredient_quantity(ingredient_id):
    data = request.json
    new_quantity = data.get('quantity')

    try:
        ingredient = Ingredient.query.get(ingredient_id)
        ingredient.stock_quantity = new_quantity
        db.session.commit()
        return jsonify(message='Ingredient quantity updated successfully')
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify(error=str(e))
    except Exception as e:
        return jsonify(error=str(e))


@app.route('/api/add-recipe', methods=['POST'])
def add_recipe():
    data = request.json

    required_fields = ['name', 'instructions', 'category_id', 'ingredient_ids']
    if not all(field in data for field in required_fields):
        return jsonify(error='Missing required fields'), 400

    recipe_name = data['name']
    instructions = data['instructions']
    category_id = data['category_id']
    description = data['description']
    ingredient_ids = data['ingredient_ids']

    try:
        ingredients = Ingredient.query.filter(Ingredient.id.in_(ingredient_ids)).all()

        new_recipe = Recipe(
            name=recipe_name,
            instructions=instructions,
            category_id=category_id,
            ingredients=ingredients,
            description=description
        )

        db.session.add(new_recipe)
        db.session.commit()

        return jsonify(message='Recipe added successfully')
    except Exception as e:
        return jsonify(error=str(e))
    
@app.route('/api/get-recipes', methods=['GET'])
def get_recipes():
    try:
        recipes = db.session.query(Recipe).join(recipe_ingredient).join(Ingredient).\
            filter(Ingredient.stock_quantity > 0).all()

        recipe_data = [
            {
                'id': recipe.id,
                'name': recipe.name,
                'instructions': recipe.instructions,
                'description': recipe.description,
                'category_id': recipe.category_id,
                'ingredients': [ingredient.name for ingredient in recipe.ingredients],
            }
            for recipe in recipes
        ]

        return jsonify(recipes=recipe_data)
    except Exception as e:
        return jsonify(error=str(e))
    
if __name__ == '__main__':
    app.run(debug=True)
