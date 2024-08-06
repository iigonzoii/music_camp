from .db import db, environment, SCHEMA, add_prefix_for_prod

class ProductType(db.Model):
    __tablename__ = 'product_types'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False)
    cd = db.Column(db.Integer, default=0)
    vinyl = db.Column(db.Integer, default=0)
    cassette = db.Column(db.Integer, default=0)
    digital = db.Column(db.Integer, default=0)

    album = db.relationship('Album', back_populates='product_types')

    def to_dict(self):
        return {
            'id': self.id,
            'album_id': self.album_id,
            'cd': self.cd,
            'vinyl': self.vinyl,
            'cassette': self.cassette,
            'digital': self.digital
        }
