from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
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
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
    #* album relation
    albums = db.relationship('Album', back_populates='user')
    #* review relation
    reviews = db.relationship('Review', back_populates='user')
    #* track relation
    tracks = db.relationship('Track', back_populates='user')
    #* purchase relation
    purchases = db.relationship('Purchase', back_populates='user')
    #* wishlist relation
    wishlist = db.relationship('Wishlist', uselist=False, back_populates='user')
    #* below is the one to one relationship for the wishlist model if youd like to cut it from here
    # user = db.relationship('User', useList=False, back_populates='wishlist')
    #* shopping cart relation
    shopping_cart = db.relationship('ShoppingCart', uselist=False, back_populates='user')
    #* below is the one to one relationship for the shopping cart model if youd like to cut it
    # user = db.relationship('User', useList=False, back_populates='shopping_cart')




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
