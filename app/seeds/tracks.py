from app.models import db, Track, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tracks():
    demo_track_1 = Track(
        album_id=1, name='Demo Track 1', duration=184, file_url='file1.url')
    demo_track_2 = Track(
        album_id=1, name='Demo Track 2', duration=204, file_url='file2.url')
    demo_track_3 = Track(
        album_id=1, name='Demo Track 3', duration=192, file_url='file3.url')
    demo_track_4 = Track(
        album_id=1, name='Demo Track 4', duration=190, file_url='file4.url')
    demo_track_5 = Track(
        album_id=1, name='Demo Track 5', duration=293, file_url='file5.url')

    rock_track_1 = Track(
        album_id=2, name='Rock Track 1', duration=154, file_url='rockfile1.url')
    rock_track_2 = Track(
        album_id=2, name='Rock Track 2', duration=128, file_url='rockfile2.url')
    rock_track_3 = Track(
        album_id=2, name='Rock Track 3', duration=185, file_url='rockfile3.url')

    hiphop_track_1 = Track(
        album_id=3, name='Hiphop Track 1', duration=184, file_url='hiphopfile1.url')
    hiphop_track_2 = Track(
        album_id=3, name='Hiphop Track 2', duration=204, file_url='hiphopfile2.url')
    hiphop_track_3 = Track(
        album_id=3, name='Hiphop Track 3', duration=231, file_url='hiphopfile3.url')

    jazz_track_1 = Track(
        album_id=4, name='Jazz Track 1', duration=184, file_url='jazzfile1.url')
    jazz_track_2 = Track(
        album_id=4, name='Jazz Track 2', duration=184, file_url='jazzfile2.url')
    jazz_track_3 = Track(
        album_id=4, name='Jazz Track 3', duration=184, file_url='jazzfile3.url')


    db.session.add(demo_track_1)
    db.session.add(demo_track_2)
    db.session.add(demo_track_3)
    db.session.add(demo_track_4)
    db.session.add(demo_track_5)
    db.session.add(rock_track_1)
    db.session.add(rock_track_2)
    db.session.add(rock_track_3)
    db.session.add(hiphop_track_1)
    db.session.add(hiphop_track_2)
    db.session.add(hiphop_track_3)
    db.session.add(jazz_track_1)
    db.session.add(jazz_track_2)
    db.session.add(jazz_track_3)

    db.session.commit()



def undo_tracks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tracks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tracks"))

    db.session.commit()
