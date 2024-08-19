from .db import db, SCHEMA, environment, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False)
    review = db.Column(db.String(250), nullable=False)
    # stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())


    #* relationship to user
    reviewer = db.relationship('User', back_populates='reviews')
    #* relationship to album
    album = db.relationship('Album', back_populates='reviews')


    def to_dict(self):
            return {
                'id': self.id,
                'user_id': self.user_id,
                'album_id': self.album_id,
                'review': self.review,
                # 'stars': self.stars,
                'created_at': self.created_at,
                'updated_at': self.updated_at
            }
