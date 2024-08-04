from .db import db, environment, SCHEMA, add_prefix_for_prod

wishlist_items = db.Table(
    'wishlist_items',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False),
    db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False),
    # db.Column('created_at', db.Date, nullable=False),
    # db.Column('updated_at', db.Date, nullable=False),
    # schema=SCHEMA if environment == "production" else None
)
if environment == "production":
        wishlist_items.schema = SCHEMA

shoppingcart_items = db.Table(
    'shoppingcart_items',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False),
    db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False),
    db.Column('quantity', db.Integer, nullable=False),
    db.Column('price', db.Float, nullable=False),
    # db.Column('created_at', db.Date, nullable=False),
    # db.Column('updated_at', db.Date, nullable=False),
    # schema=SCHEMA if environment == "production" else None
)
if environment == "production":
        shoppingcart_items.schema = SCHEMA

# purchase_items = db.Table(
#     'purchase_items',
#     db.Column('id', db.Integer, primary_key=True),
#     db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False),
#     db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False),
#     db.Column('quantity', db.Integer, nullable=False),
#     db.Column('price', db.Float, nullable=False),
#     # db.Column('created_at', db.Date, nullable=False),
#     # db.Column('updated_at', db.Date, nullable=False),
#     # schema=SCHEMA if environment == "production" else None
# )
# if environment == "production":
#         purchase_items.schema = SCHEMA
