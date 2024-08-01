from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review_1 = Review(
        user_id=1, album_id=1,
        review="The review of the album goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars=4
    )
    review_2 = Review(
        user_id=1, album_id=2,
        review="The review of the album goes here. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        stars=3
    )
    review_3 = Review(
        user_id=2, album_id=2,
        review="The review of the album goes here. Senectus euismod porttitor commodo vulputate etiam diam vivamus elementum? Dapibus dolor elementum blandit faucibus rutrum volutpat justo molestie viverra. ",
        stars=1
    )
    review_4 = Review(
        user_id=2, album_id=3,
        review="The review of the album goes here. Fusce per porttitor justo himenaeos ultricies, dui iaculis nunc. Himenaeos tempor ultricies taciti blandit malesuada ultricies molestie. ",
        stars=5
    )


    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
