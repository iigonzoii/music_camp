from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Demo", last_name='User', email='demotest@aa.io', city='Denver', state='Colorado', username='DemoUser', password='password',
        bio='This is where band bio goes', website='artistWebSite',
        spotify="spotifyUserName", instagram='instagramUrl', facebook='facebookprofileUrl',
        profile_img_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampUserProfileImg.jpg?alt=media&token=949d5249-d3c3-4e79-a385-4f3e0774c6bc',
        banner_img_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampBand.jpg?alt=media&token=70d07189-3781-4ddd-a803-da95edc9e302',
        background_img_url="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampBackground.jpg?alt=media&token=df57940f-056e-468f-aae7-dfe860753847",
        )
    user_one = User(
        first_name='User', last_name='One', email='demotest2@aa.io', city='Denver', state='Colorado', username='DemoUser1', password='password')
    user_two = User(
        first_name="User", last_name="Two", email='demotest3@aa.io', city='Denver', state='Colorado', username='DemoUser2', password='password')

    artist_one= User(
        first_name="Artist", last_name='One', email='demoartest4@aa.io', city='Oakland', state='California', username='DemoArtist1', password='password',
        bio='This is where band bio goes', website='artistWebSite',
        spotify="spotifyUserName",instagram='instagramUrl', facebook='facebookprofileUrl',
        profile_img_url='imgUrlHere', banner_img_url='imgUrlHere', background_img_url="imgUrlHere"
        )
    artist_two=User(
        first_name="Artist", last_name='Two', email='demoartest5@aa.io', city='Boston', state='Massachusetts', username='DemoArtist2', password='password',
        bio='This is where band bio goes', website='artistWebSite',
        spotify="spotifyUserName",instagram='instagramUrl', facebook='facebookprofileUrl',
        profile_img_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampUserProfileImg.jpg?alt=media&token=949d5249-d3c3-4e79-a385-4f3e0774c6bc',
        banner_img_url='https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/bannerDark.jpg?alt=media&token=29d23da4-1850-40a4-a776-991471c4a0f4',
        background_img_url="https://firebasestorage.googleapis.com/v0/b/musiccamp-88aaa.appspot.com/o/musicCampBackground.jpg?alt=media&token=df57940f-056e-468f-aae7-dfe860753847"
        )
    artist_three=User(
        first_name="Artist", last_name='Three', email='demoartest6@aa.io', city='New Orleans', state='Louisiana', username='DemoArtist3', password='password',
        bio='This is where band bio goes', website='artistWebSite',
        spotify="spotifyUserName", instagram='instagramUrl', facebook='facebookprofileUrl',
        profile_img_url='imgUrlHere', banner_img_url='imgUrlHere', background_img_url="imgUrlHere",
        )
    artist_four=User(
        first_name="Artist", last_name='Four', email='demoartest7@aa.io', city='Austin', state='Texas', username='DemoArtist4', password='password',
        bio='This is where band bio goes', website='artistWebSite',
        spotify="spotifyUserName", instagram='instagramUrl', facebook='facebookprofileUrl',
        profile_img_url='imgUrlHere', banner_img_url='imgUrlHere', background_img_url="imgUrlHere",
        )


    db.session.add(demo)
    db.session.add(user_one)
    db.session.add(user_two)
    db.session.add(artist_one)
    db.session.add(artist_two)
    db.session.add(artist_three)
    db.session.add(artist_four)
    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))


    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))


    db.session.commit()
