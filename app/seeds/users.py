from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
   
    artist_one= User(
        first_name="Gandoff", last_name='Grey', email='pink.floyd@aa.io', username='PinkFloyd', password='password',bio='This is where band bio goes',website='artistWebSite',spotify="spotifyUserName",instagram='instagramUrl', facebook='facebookprofileUrl',profile_img_url='imgUrlHere',banner_img_url='imgUrlHere', background_img_url="imgUrlHere"
        )

    db.session.add(artist_one)
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
