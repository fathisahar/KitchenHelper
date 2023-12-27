from flask_sqlalchemy import SQLAlchemy
from server import db, app


#UPDATE TABLES
class Recipe(db.Model):
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    ingredients = db.relationship('Ingredient', secondary='recipe_ingredient', backref='recipes')
    ingredient_ids = db.Column(db.String(255))  # Change the data type if needed

class Ingredient(db.Model):
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    stock_quantity = db.Column(db.Float, nullable=False)
    stock_type = db.Column(db.String(255), nullable=False)

class Category(db.Model):
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.Integer, primary_key=True)
    categoryType = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    ingredients = db.relationship('Ingredient', backref='category', lazy=True)
    recipes = db.relationship('Recipe', backref='category', lazy=True)

recipe_ingredient = db.Table(
    'recipe_ingredient',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id'), primary_key=True),
    extend_existing=True
)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()