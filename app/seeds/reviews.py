from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    demo_review_1 = Review(
        user_id=1, album_id=1,
        review="Lorem ipsum odor amet, consectetuer adipiscing elit. Lectus at varius ultricies elementum montes suscipit himenaeos. Amalesuada potenti quis suscipit lectus dapibus.")

    demo_review_2 = Review(
        user_id=1, album_id=2,
        review="Nostra neque etiam egestas ultrices et pellentesque. Venenatis platea ad facilisi interdum nullam. Feugiat quis ante porta suscipit, orci himenaeos varius.")

    demo_review_3 = Review(
        user_id=2, album_id=2,
        review="Dui nascetur rutrum aliquam class curabitur accumsan commodo ridiculus. Amet felis est orci ultrices penatibus.")
    
    demo_review_4 = Review(
        user_id=2, album_id=3,
        review="Penatibus tellus tortor nisl, ultrices ultrices erat fermentum. Malesuada fermentum dui non eget magna quam.")

    demo_review_5 = Review(
        user_id=3, album_id=3,
        review="Sapien lectus ultricies velit purus nascetur. Ut sed bibendum cubilia dui a fusce.")
    demo_review_6 = Review(
        user_id=3, album_id=4,
        review="Mattis libero mollis ut sem eros facilisis elementum morbi. Sagittis donec egestas tortor mattis primis. Cursus velit morbi varius risus non himenaeos.")

    db.session.add(demo_review_1)
    db.session.add(demo_review_2)
    db.session.add(demo_review_3)
    db.session.add(demo_review_4)
    db.session.add(demo_review_5)
    db.session.add(demo_review_6)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
