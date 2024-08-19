from .db import db, environment, SCHEMA, add_prefix_for_prod

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    band = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    cover_image_url = db.Column(db.String)
    description = db.Column(db.String, nullable=False)
    producer = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    tags = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())


    # relationship to User many to one
    artist = db.relationship('User', back_populates='albums')
    # relationship to Track one to many
    tracks = db.relationship('Track', back_populates='album', cascade="all, delete-orphan")
    # relationship to reviews
    reviews = db.relationship('Review', back_populates='album', cascade="all, delete-orphan")
    # relationship to purchases
    purchases = db.relationship('PurchaseItem', back_populates='album')
    # relationship to product_types
    products = db.relationship('ProductType', back_populates='album', cascade="all, delete-orphan")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'band': self.band,
            'title': self.title,
            'cover_image_url': self.cover_image_url,
            'description': self.description,
            'producer': self.producer,
            'genre': self.genre,
            'tags': self.tags,
            'products': [pt.to_dict() for pt in self.products],
            'tracks': [track.to_dict() for track in self.tracks],
            'reviews': [review.to_dict() for review in self.reviews],
            'purchases': [purchase.to_dict() for purchase in self.purchases],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
