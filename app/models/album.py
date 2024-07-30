from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class Album(db.Model):
    __tablename__ = 'albums'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    band = Column(String(50), nullable=False)
    title = Column(String(50), nullable=False)
    product_type = Column(String, nullable=False)
    cover_image_url = Column(String, nullable=False)
    description = Column(String, nullable=False)
    producer = Column(String, nullable=False)
    genre = Column(String, nullable=False)
    tags = Column(String)
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False)

        # relationship to User many to one
    user = relationship('User', back_populates='albums')

    # relationship to Track one to many
    tracks = relationship('Track', back_populates='album')



