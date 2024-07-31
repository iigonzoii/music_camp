from .db import db, environment, SCHEMA


class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    band = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    product_type = db.Column(db.String, nullable=False)
    cover_image_url = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    producer = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    tags = db.Column(db.String)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)

    #  relationship to User
    user = db.relationship('User', back_populates='albums')

    #  relationship to Track
    tracks = db.relationship('Track', back_populates='album')

    # relationship to Review
    reviews = db.relationship('Review', back_populates='album')

