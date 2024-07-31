from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    demo_album = Album(
    user_id=1, band='Demo Band', title='Demo Title', product_type='Demo type',
    cover_image_url='', description='Sentences describing the album',
    producer='Demo Producer', genre=['Demo Genre', 'Disco', 'Hip Hop'], tags=['Demo Tags', 'Psychedelic', 'Upbeat'])
