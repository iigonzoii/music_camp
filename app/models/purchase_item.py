from .db import db, environment, SCHEMA, add_prefix_for_prod

class PurchaseItem(db.Model):
    __tablename__ = 'purchase_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')))
    type = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())
    updated_at = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())


    # Relationships
    user = db.relationship('User', back_populates='purchases')
    album = db.relationship('Album', back_populates='purchases')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'album_id': self.album_id,
            'type': self.type,
            'quantity': self.quantity,
            'price': self.price,
        }