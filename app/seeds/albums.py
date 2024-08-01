from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text


def seed_albums():
    album_one = Album(
        user_id=1, band='ArtistOne',title='albumOne',product_type='CD',cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampRockAlbumCover.jpg?alt=media&token=3d36d4a9-7fab-4f37-ac7d-e677d5a94495',description='This is a description about a rock cd', producer='awesome producer',genre='rock',tags='hard rock',price=4.19,stock=10
        )
    album_two = Album(
        user_id=1, band='ArtistTwo',title='albumTwo',product_type='digital',cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampElectronicAlbumCover.jpg?alt=media&token=3f64c61d-5852-4c61-a080-7736041cc47d',description='This is a description about a digital album', producer='awesome producer',genre='electronic',tags='ambient',price=4.21,stock=10)
    album_three = Album(
        user_id=1, band='ArtistThree',title='albumThree',product_type='vinyl',cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampHipHopVinylCover.jpg?alt=media&token=d379f3e9-15bb-4045-ac4d-fee49461ea35',description='This is a description about a vinyl album', producer='awesome producer',genre='hip-hop/rap',tags='trap',price=4.22,stock=10)
    album_four= Album(
        user_id=1, band='ArtistFour',title='albumFour',product_type='cassette',cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',description='This is a description about a cassette', producer='awesome producer',genre='jazz',tags='electronic', price=4.24,stock=10
        )


    db.session.add(album_one)
    db.session.add(album_two)
    db.session.add(album_three)
    db.session.add(album_four)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
