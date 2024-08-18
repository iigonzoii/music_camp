from .db import db, environment, SCHEMA, add_prefix_for_prod


class Track(db.Model):
    __tablename__ = 'tracks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(50), nullable=False)
    duration = db.Column(db.Float, nullable=False)  # Duration in seconds
    file_url = db.Column(db.String(250))
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())


    # Relationship to Album (many-to-one)
    album = db.relationship('Album', back_populates='tracks')

    # Relationship to User (many-to-one)
    user = db.relationship('User', back_populates='tracks')

    def to_dict(self):
                return {
                    'id': self.id,
                    'user_id': self.user_id,
                    'album_id': self.album_id,
                    'name': self.name,
                    'duration': self.duration,
                    'created_at': self.created_at,
                    'updated_at': self.updated_at
                }