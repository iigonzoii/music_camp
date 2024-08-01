from .db import db, SCHEMA, environment

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False)
    review = db.Column(db.String(250), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
    #* relationship to user
    reviewer = db.relationship('User', back_populates='reviews')
    #* relationship to album
    album = db.relationship('Album', back_populates='reviews')
