from app.models import db, Track, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tracks():
    demo_track = Track(
    album_id=1, name='Demo Track', duration=184, file_url='file.url')
