from .db import db, environment, SCHEMA


class Track(db.Model):
    __tablename__ = 'tracks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey('albums.id'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    duration = db.Column(db.Float, nullable=False)  # Duration in seconds
    file_url = db.Column(db.String(250))

    # Relationship to Album (many-to-one)
    album = db.relationship('Album', back_populates='tracks')
    
    # Relationship to User (many-to-one)
    user = db.relationship('User', back_populates='tracks')
