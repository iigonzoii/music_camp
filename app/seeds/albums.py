from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    demo_album_1 = Album(
        user_id=1, band='Demo Band-1', title='Demo Title 1', product_type='Demo type',
        cover_image_url='user1CoverImg1.url', description='Sentences describing the demo album 1',
        producer='Demo Producer 1', genre=['Demo Genre', 'R&B', 'Indie'], tags=['Demo Tags', 'Chill', 'New York', 'Alternative'],
        price=2.00, stock=25)
    demo_album_2 = Album(
        user_id=1, band='Demo Band-1', title='Demo Title 2', product_type='Demo type',
        cover_image_url='user1CoverImg2.url', description='Sentences describing the demo album 2',
        producer='Demo Producer 2', genre=['Demo Genre', 'Disco', 'Hip Hop'], tags=['Demo Tags', 'Psychedelic', 'Upbeat'],
        price=5.00, stock=45)
    demo_album_3 = Album(
        user_id=1, band='Demo Band-2', title='Demo Title 3', product_type='Demo type',
        cover_image_url='user1CoverImg3.url', description='Sentences describing the demo album 3',
        producer='Demo Producer 3', genre=['Demo Genre', 'Funk', 'Dance'], tags=['Demo Tags', 'Experimental', 'Electronic'],
        price=2.50, stock=30)
    demo_album_4 = Album(
        user_id=2, band='Demo2Band', title='Demo2 Title 1', product_type='Demo2 type',
        cover_image_url='user2CoverImg1.url', description='Sentences describing the demo2 album 1',
        producer='Demo Producer 1', genre=['Demo Genre', 'Classical', 'Contemporary'], tags=['Demo Tags', 'New Age', 'Acoustic'],
        price=3.00, stock=20)
    demo_album_5 = Album(
        user_id=2, band='Demo2Band', title='Demo2 Title 2', product_type='Demo2 type',
        cover_image_url='user2CoverImg2.url', description='Sentences describing the demo2 album 2',
        producer='Demo Producer 2', genre=['Demo Genre', 'R&B', 'Contemporary'], tags=['Demo Tags', 'New Age', 'Electronic', 'Berlin'],
        price=3.00, stock=20)

    db.session.add(demo_album_1)
    db.session.add(demo_album_2)
    db.session.add(demo_album_3)
    db.session.add(demo_album_4)
    db.session.add(demo_album_5)

    db.session.commit()


def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
