from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class Track(db.Model):
    __tablename__ = 'tracks'
    id = Column(Integer, primary_key=True)
    album_id = Column(Integer, ForeignKey('albums.id'), nullable=False)
    name = Column(String(50), nullable=False)
    duration = Column(Float, nullable=False)  # Duration in seconds
    file_url = Column(String(250), nullable=False)

    # relationship to Album many to one
    album = relationship('Album', back_populates='tracks')
    artist = relationship('User', back_populates='tracks')
