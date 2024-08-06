from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductType(db.Model):
    __tablename__ = 'product_types'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False)
    type = db.Column(db.String, nullable=False)
    amount = db.Column(db.Integer, default=0)
    price = db.Column(db.Float, nullable=False, default=0)

    album = db.relationship('Album', back_populates='product_types')

    def to_dict(self):
        return {
            'id': self.id,
            'album_id': self.album_id,
            'type': self.type,
            'amount': self.amount,
            'price': self.price
        }
    
    
