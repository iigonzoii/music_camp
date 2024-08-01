from app.models import db, wishlist_items, environment, SCHEMA
from sqlalchemy.sql import text

def seed_wishlist():
    wish_item_1 = wishlist_items(
        user_id=1,
        album_id=1
    )
    wish_item_2 = wishlist_items(
        user_id=1,
        album_id=2
    )
    wish_item_3 = wishlist_items(
        user_id=2,
        album_id=3
    )
    wish_item_4 = wishlist_items(
        user_id=2,
        album_id=4
    )

    db.session.add(wish_item_1)
    db.session.add(wish_item_2)
    db.session.add(wish_item_3)
    db.session.add(wish_item_4)

    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishlist_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wishlist_items"))

    db.session.commit()
