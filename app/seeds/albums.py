from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text


def seed_albums():
    album_one = Album(
        user_id=4, band='ArtistOne', title='Artist1Al1',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampRockAlbumCover.jpg?alt=media&token=3d36d4a9-7fab-4f37-ac7d-e677d5a94495',
        description='This is a description about a rock cd',
        producer='awesome producer', genre='rock', tags='hard rock',
    )
    album_two = Album(
        user_id=5, band='ArtistTwo', title='Artist2Al1',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampElectronicAlbumCover.jpg?alt=media&token=3f64c61d-5852-4c61-a080-7736041cc47d',
        description='This is a description about a digital album',
        producer='awesome producer', genre='electronic', tags='ambient',
    )
    album_three = Album(
        user_id=6, band='ArtistThree', title='Artist3Al1',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampHipHopVinylCover.jpg?alt=media&token=d379f3e9-15bb-4045-ac4d-fee49461ea35',
        description='This is a description about a vinyl album',
        producer='awesome producer', genre='hip-hop/rap', tags='trap',
    )
    album_four= Album(
        user_id=7, band='ArtistFour', title='albumFour',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='jazz', tags='Latin jazz',
    )
    album_five= Album(
        user_id=5, band='ArtistTwo', title='Artist2Al2',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='rock', tags='Acid rock',
    )
    album_six= Album(
        user_id=5, band='ArtistTwo', title='Artist2Al3',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='hip-hop/rap', tags='G-funk',
    )
    album_seven= Album(
        user_id=5, band='ArtistTwo', title='Artist2Al4',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='jazz', tags='Smooth Jazz',
    )
    album_eight= Album(
        user_id=4, band='ArtistOne', title='Artist1Al2',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='electronic', tags='trap',
    )
    album_nine= Album(
        user_id=4, band='ArtistOne', title='Artist1Al3',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='hip-hop/rap', tags='Old-school',
    )
    album_ten= Album(
        user_id=4, band='ArtistOne', title='Artist1Al4',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='jazz', tags='electronic',
    )
    album_eleven= Album(
        user_id=6, band='ArtistThree', title='Artist3Al2',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='rock', tags='Pop-punk',
    )
    album_twelve= Album(
        user_id=6, band='ArtistThree', title='Artist3Al3',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='jazz', tags='Traditional jazz',
    )
    album_thirteen= Album(
        user_id=6, band='ArtistThree', title='Artist3Al4',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='electronic', tags='lowfi',
    )
    album_fourteen= Album(
        user_id=7, band='ArtistFour', title='Artist4Al2',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='rock', tags='Gothic rock',
    )
    album_fifteen= Album(
        user_id=7, band='ArtistFour', title='Artist4Al3',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='electronic', tags='house',
    )
    album_sixteen= Album(
        user_id=7, band='ArtistFour', title='Artist4Al4',
        cover_image_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampJazzAlbumCover.jpg?alt=media&token=6c3b578d-bc59-4c28-83d7-8e17971608d8',
        description='This is a description about a cassette',
        producer='awesome producer', genre='hip-hop/rap', tags='Conscious',
    )


    db.session.add(album_one)
    db.session.add(album_two)
    db.session.add(album_three)
    db.session.add(album_four)
    db.session.add(album_five)
    db.session.add(album_six)
    db.session.add(album_seven)
    db.session.add(album_eight)
    db.session.add(album_nine)
    db.session.add(album_ten)
    db.session.add(album_eleven)
    db.session.add(album_twelve)
    db.session.add(album_thirteen)
    db.session.add(album_fourteen)
    db.session.add(album_fifteen)
    db.session.add(album_sixteen)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
