from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import or_


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://saharfathi:fathiSahar4321@localhost/kitchen'
db = SQLAlchemy(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})



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
        categories = db.session.execute(
            db.select(Category)
            .filter(or_(Category.categoryType == 'ingredient', Category.categoryType == 'recipe'))
            .order_by(Category.categoryType)
        ).scalars()

        category_names = [category.name for category in categories]
        
        return jsonify(categories=category_names)
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
    
@app.route('/api/get-recipe-categories', methods=['GET'])
def get_recipe_categories():
    try:
        categories = db.session.execute(db.select(Category)
                .filter_by(categoryType='recipe')
                .order_by(Category.categoryType)).scalars()

        category_names = [category.name for category in categories]

        return jsonify(categories=category_names)
    except Exception as e:
        return jsonify(error=str(e))


@app.route('/api/add-ingredient', methods=['POST'])
def add_ingredient():
    data = request.json
    ingredient_name = data.get('nameIngredient')
    category_name = data.get('categoryIngredient') 
    stock_quantity = data.get('quantityIngredient') 
    stock_type = data.get('quantityType')

    try:
        category_instance = db.session.execute(db.select(Category)
            .filter_by(name=category_name)).scalar()

        if category_instance:
            category_id = category_instance.id
        else:
            return jsonify(error='Category not found')

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
        return jsonify(error=str(e))


@app.route('/api/add-recipe', methods=['POST'])
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
    
@app.route('/api/add-category', methods=['POST'])
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


    
if __name__ == '__main__':
    app.run(debug=True)
