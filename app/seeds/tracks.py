from app.models import db, Track, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tracks():
    demo_track_1 = Track(
        album_id=1, user_id=4, name='Demo Track 1', duration=184, file_url='file1.url')
    demo_track_5 = Track(
        album_id=1, user_id=4, name='Demo Track 5', duration=293, file_url='file5.url')
    demo_track_2 = Track(
        album_id=2, user_id=5, name='Demo Track 2', duration=204, file_url='file2.url')
    demo_track_3 = Track(
        album_id=3, user_id=6, name='Demo Track 3', duration=192, file_url='file3.url')
    demo_track_4 = Track(
        album_id=4, user_id=7, name='Demo Track 4', duration=190, file_url='file4.url')

    db.session.add(demo_track_1)
    db.session.add(demo_track_2)
    db.session.add(demo_track_3)
    db.session.add(demo_track_4)
    db.session.add(demo_track_5)

    db.session.commit()



def undo_tracks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tracks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tracks"))

    db.session.commit()
