from flask_sqlalchemy import SQLAlchemy
from server import db, app

class Recipe(db.Model):
    __tablename__ = 'recipe'  # Add this line to explicitly define the table name
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    ingredients = db.relationship('Ingredient', secondary='recipe_ingredient', backref='recipes')

class Ingredient(db.Model):
    __tablename__ = 'ingredient'  # Add this line to explicitly define the table name
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    stock_quantity = db.Column(db.Float, nullable=False)

class Category(db.Model):
    __tablename__ = 'category'  # Add this line to explicitly define the table name
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    ingredients = db.relationship('Ingredient', backref='category', lazy=True)
    recipes = db.relationship('Recipe', backref='category', lazy=True)

# Rest of your code remains the same...

# Association table for many-to-many relationship between Recipe and Ingredient
recipe_ingredient = db.Table(
    'recipe_ingredient',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id'), primary_key=True)
)

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()  
        db.create_all()