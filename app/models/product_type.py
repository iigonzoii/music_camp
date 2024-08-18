from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductType(db.Model):
    __tablename__ = 'product_types'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id'), ondelete='CASCADE'), nullable=False)
    type = db.Column(db.String, nullable=False)
    amount = db.Column(db.Integer, default=0)
    price = db.Column(db.Float, nullable=False, default=0)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())


    album = db.relationship('Album', back_populates='products')

    def to_dict(self):
        return {
            'id': self.id,
            'album_id': self.album_id,
            'type': self.type,
            'amount': self.amount,
            'price': self.price,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    