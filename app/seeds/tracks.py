from app.models import db, Track, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tracks():
    demo_track_1a = Track(
        album_id=1, user_id=4, name='Demo Track 1a', duration=184, file_url='file1.url')
    demo_track_1b = Track(
        album_id=1, user_id=4, name='Demo Track 1b', duration=293, file_url='file5.url')
    demo_track_1c = Track(
        album_id=1, user_id=4, name='Demo Track 1c', duration=293, file_url='file5.url')
    demo_track_2a = Track(
        album_id=2, user_id=5, name='Demo Track 2a', duration=204, file_url='file2.url')
    demo_track_2b = Track(
        album_id=2, user_id=5, name='Demo Track 2b', duration=204, file_url='file2.url')
    demo_track_2c = Track(
        album_id=2, user_id=5, name='Demo Track 2c', duration=204, file_url='file2.url')
    demo_track_3a = Track(
        album_id=3, user_id=6, name='Demo Track 3a', duration=192, file_url='file3.url')
    demo_track_3b = Track(
        album_id=3, user_id=6, name='Demo Track 3b', duration=192, file_url='file3.url')
    demo_track_3c = Track(
        album_id=3, user_id=6, name='Demo Track 3c', duration=192, file_url='file3.url')
    demo_track_4a = Track(
        album_id=4, user_id=7, name='Demo Track 4a', duration=190, file_url='file4.url')
    demo_track_4b = Track(
        album_id=4, user_id=7, name='Demo Track 4b', duration=190, file_url='file4.url')
    demo_track_4c = Track(
        album_id=4, user_id=7, name='Demo Track 4b', duration=190, file_url='file4.url')

    db.session.add(demo_track_1a)
    db.session.add(demo_track_1b)
    db.session.add(demo_track_2a)
    db.session.add(demo_track_2b)
    db.session.add(demo_track_3a)
    db.session.add(demo_track_3b)
    db.session.add(demo_track_4a)
    db.session.add(demo_track_4b)


    db.session.commit()



def undo_tracks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tracks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tracks"))

    db.session.commit()
