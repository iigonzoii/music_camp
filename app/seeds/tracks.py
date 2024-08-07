from app.models import db, Track, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tracks():
    demo_track_1a = Track(
        album_id=1, user_id=4, name='Demo Track 1a', duration=184, file_url='file1.url')
    demo_track_1b = Track(
        album_id=1, user_id=4, name='Demo Track 1b', duration=293, file_url='file5.url')
    demo_track_1c = Track(
        album_id=1, user_id=4, name='Demo Track 1c', duration=204, file_url='file5.url')
    demo_track_2a = Track(
        album_id=2, user_id=5, name='Demo Track 2a', duration=184, file_url='file2.url')
    demo_track_2b = Track(
        album_id=2, user_id=5, name='Demo Track 2b', duration=293, file_url='file2.url')
    demo_track_2c = Track(
        album_id=2, user_id=5, name='Demo Track 2c', duration=204, file_url='file2.url')
    demo_track_3a = Track(
        album_id=3, user_id=6, name='Demo Track 3a', duration=192, file_url='file3.url')
    demo_track_3b = Track(
        album_id=3, user_id=6, name='Demo Track 3b', duration=195, file_url='file3.url')
    demo_track_3c = Track(
        album_id=3, user_id=6, name='Demo Track 3c', duration=199, file_url='file3.url')
    demo_track_4a = Track(
        album_id=4, user_id=7, name='Demo Track 4a', duration=280, file_url='file4.url')
    demo_track_4b = Track(
        album_id=4, user_id=7, name='Demo Track 4b', duration=290, file_url='file4.url')
    demo_track_4c = Track(
        album_id=4, user_id=7, name='Demo Track 4b', duration=180, file_url='file4.url')
    demo_track_5a = Track(
        album_id=5, user_id=4, name='Demo Track 5a', duration=184, file_url='file1.url')
    demo_track_5b = Track(
        album_id=5, user_id=4, name='Demo Track 5b', duration=293, file_url='file5.url')
    demo_track_5c = Track(
        album_id=5, user_id=4, name='Demo Track 5c', duration=204, file_url='file5.url')
    demo_track_6a = Track(
        album_id=6, user_id=4, name='Demo Track 6a', duration=184, file_url='file1.url')
    demo_track_6b = Track(
        album_id=6, user_id=4, name='Demo Track 6b', duration=293, file_url='file5.url')
    demo_track_6c = Track(
        album_id=6, user_id=4, name='Demo Track 6c', duration=204, file_url='file5.url')
    demo_track_7a = Track(
        album_id=7, user_id=4, name='Demo Track 7a', duration=184, file_url='file1.url')
    demo_track_7b = Track(
        album_id=7, user_id=4, name='Demo Track 7b', duration=293, file_url='file5.url')
    demo_track_7c = Track(
        album_id=7, user_id=4, name='Demo Track 7c', duration=204, file_url='file5.url')
    demo_track_8a = Track(
        album_id=8, user_id=4, name='Demo Track 8a', duration=184, file_url='file1.url')
    demo_track_8b = Track(
        album_id=8, user_id=4, name='Demo Track 8b', duration=293, file_url='file5.url')
    demo_track_8c = Track(
        album_id=8, user_id=4, name='Demo Track 8c', duration=204, file_url='file5.url')
    demo_track_9 = Track(
        album_id=9, user_id=4, name='Demo Track 9', duration=184, file_url='file1.url')
    demo_track_10 = Track(
        album_id=10, user_id=4, name='Demo Track 10', duration=184, file_url='file1.url')
    demo_track_11 = Track(
        album_id=11, user_id=4, name='Demo Track 11', duration=184, file_url='file1.url')
    demo_track_12 = Track(
        album_id=12, user_id=4, name='Demo Track 12', duration=184, file_url='file1.url')
    demo_track_13 = Track(
        album_id=13, user_id=4, name='Demo Track 13', duration=184, file_url='file1.url')
    demo_track_14 = Track(
        album_id=14, user_id=4, name='Demo Track 14', duration=184, file_url='file1.url')
    demo_track_15 = Track(
        album_id=15, user_id=4, name='Demo Track 15', duration=184, file_url='file1.url')
    demo_track_16 = Track(
        album_id=16, user_id=4, name='Demo Track 16', duration=184, file_url='file1.url')
    db.session.add(demo_track_1a)
    db.session.add(demo_track_1b)
    db.session.add(demo_track_1c)
    db.session.add(demo_track_2a)
    db.session.add(demo_track_2b)
    db.session.add(demo_track_2c)
    db.session.add(demo_track_3a)
    db.session.add(demo_track_3b)
    db.session.add(demo_track_3c)
    db.session.add(demo_track_4a)
    db.session.add(demo_track_4b)
    db.session.add(demo_track_4c)
    db.session.add(demo_track_5a)
    db.session.add(demo_track_5b)
    db.session.add(demo_track_5c)
    db.session.add(demo_track_6a)
    db.session.add(demo_track_6b)
    db.session.add(demo_track_6c)
    db.session.add(demo_track_7a)
    db.session.add(demo_track_7b)
    db.session.add(demo_track_7c)
    db.session.add(demo_track_8a)
    db.session.add(demo_track_8b)
    db.session.add(demo_track_8c)
    db.session.add(demo_track_9)
    db.session.add(demo_track_10)
    db.session.add(demo_track_11)
    db.session.add(demo_track_12)
    db.session.add(demo_track_13)
    db.session.add(demo_track_14)
    db.session.add(demo_track_15)
    db.session.add(demo_track_16)


    db.session.commit()



def undo_tracks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tracks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tracks"))

    db.session.commit()
