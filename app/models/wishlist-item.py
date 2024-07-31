from .db import db, environment, SCHEMA


class WishlistItem(db.Model):
    __tablename__ = 'wishlist_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    album_id = db.Column(db.Integer, ForeignKey('albums.id'), nullable=False)

    # relationship to User many to many
    user = db.relationship('User', back_populates='wishlist_items')
    # relationship to Album many to many
    album = db.relationship('Album', back_populates='wishlist_items')
