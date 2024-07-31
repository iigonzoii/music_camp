from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')

    #seeder data
    testuser1 = User(
        username='testuser1', email='testuser1@email.com', password='password',
        firstName='Charlie', lastName='Booth', bio='bio of the user', website='userWebsite.url',
        spotify='spotifyLink.url', instagram='instaLink.url', facebook='fbLink.url',
        profileImageUrl='profileImg.url', bannerImageUrl='bannerImg.url', backgroundImageUrl='bgImg.url')
    testuser2 = User(
        username='testuser2', email='testuser2@email.com', password='password')
    testuser3 = User(
        username='testuser3', email='testuser3@email.com', password='password')
    testuser4 = User(
        username='testuser4', email='testuser4@email.com', password='password')
    testuser5 = User(
        username='testuser5', email='testuser5@email.com', password='password')
    testuser6 = User(
        username='testuser6', email='testuser6@email.com', password='password')
    testuser7 = User(
        username='testuser7', email='testuser7@email.com', password='password')
    testuser8 = User(
        username='testuser8', email='testuser8@email.com', password='password')
    testuser9 = User(
        username='testuser9', email='testuser9@email.com', password='password')
    testuser10 = User(
        username='testuser10', email='testuser10@email.com', password='password')
    testuser11 = User(
        username='testuser11', email='testuser11@email.com', password='password')
    testuser12 = User(
        username='testuser12', email='testuser12@email.com', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(testuser1)
    db.session.add(testuser2)
    db.session.add(testuser3)
    db.session.add(testuser4)
    db.session.add(testuser5)
    db.session.add(testuser6)
    db.session.add(testuser7)
    db.session.add(testuser8)
    db.session.add(testuser9)
    db.session.add(testuser10)
    db.session.add(testuser11)
    db.session.add(testuser12)

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
