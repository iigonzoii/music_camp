from .db import db, environment, SCHEMA

wishlist_items = db.Table(
    'wishlist_items',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
    db.Column('album_id', db.Integer, db.ForeignKey('albums.id'), nullable=False),
    # db.Column('created_at', db.Date, nullable=False),
    # db.Column('updated_at', db.Date, nullable=False),
    schema=SCHEMA if environment == "production" else None
)

shoppingcart_items = db.Table(
    'shoppingcart_items',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
    db.Column('album_id', db.Integer, db.ForeignKey('albums.id'), nullable=False),
    db.Column('quantity', db.Integer, nullable=False),
    db.Column('price', db.Float, nullable=False),
    # db.Column('created_at', db.Date, nullable=False),
    # db.Column('updated_at', db.Date, nullable=False),
    schema=SCHEMA if environment == "production" else None
)

purchase_items = db.Table(
    'purchase_items',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), nullable=False),
    db.Column('album_id', db.Integer, db.ForeignKey('albums.id'), nullable=False),
    db.Column('quantity', db.Integer, nullable=False),
    db.Column('price', db.Float, nullable=False),
    # db.Column('created_at', db.Date, nullable=False),
    # db.Column('updated_at', db.Date, nullable=False),
    schema=SCHEMA if environment == "production" else None
)
