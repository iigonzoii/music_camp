from .db import db, environment, SCHEMA


class ShoppingcartItem(db.Model):
    __tablename__ = 'shoppingcart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    album_id = db.Column(db.Integer, ForeignKey('albums.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

    # relationship to Shoppingcart many to many
    user = db.relationship('User', back_populates='shoppingcart_items')
    # relationship to Album many to many
    album = db.relationship('Album', back_populates='shoppingcart_items')
