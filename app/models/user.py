from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from .associations import wishlist_items, shoppingcart_items, purchase_items

# * db is being called on another page and we import it on line one
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String(250))
    website = db.Column(db.String(40))
    spotify = db.Column(db.String(40))
    instagram = db.Column(db.String(40))
    website = db.Column(db.String(40))
    facebook = db.Column(db.String(40))
    profile_img_url = db.Column(db.String(200))
    banner_img_url = db.Column(db.String(200))
    backround_img_url = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    #* album relation
    albums = db.relationship('Album', back_populates='artist')
    #* review relation
    reviews = db.relationship('Review', back_populates='reviewer')
    #* track relation
    tracks = db.relationship('Track', back_populates='artist')

    #* Association table relations with User
    wishlisted_albums = db.relationship('Album', secondary=wishlist_items, backref='user_wishlist')
    cart_albums = db.relationship('Album', secondary=shoppingcart_items, backref='user_cart')
    purchased_albums = db.relationship('Album', secondary=purchase_items, backref='user_purchases')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
