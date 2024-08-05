from .db import db, environment, SCHEMA, add_prefix_for_prod

wishlist = db.Table(
    'wishlist_items',
    db.Column('id', db.Integer, primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False),
    db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False),
    # db.Column('created_at', db.Date, nullable=False),
    # db.Column('updated_at', db.Date, nullable=False),
    # schema=SCHEMA if environment == "production" else None
)
if environment == "production":
        wishlist.schema = SCHEMA

# cart_items = db.Table(
#     'cart_items',
#     db.Column('id', db.Integer, primary_key=True),
#     db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False),
#     db.Column('album_id', db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False),
    # db.Column('quantity', db.Integer, nullable=False),
    # db.Column('price', db.Float, nullable=False),
    # db.Column('total_price', db.Numeric)
    # db.Column('created_at', db.Date, nullable=False),
    # db.Column('updated_at', db.Date, nullable=False),
    # schema=SCHEMA if environment == "production" else None
    # CONSTRAINT unique_user_album UNIQUE (user_id, album_id)
# )

# if environment == "production":
#         cart_items.schema = SCHEMA

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
