from app.models import db, cart_items, environment, SCHEMA
from sqlalchemy.sql import text


def seed_shopping_cart():
    cart_item_1 = cart_items(
        user_id=1, album_id=1, quantity=2, price=4.19)
    cart_item_2 = cart_items(
        user_id=2, album_id=1, quantity=1, price=4.19)

    cart_item_3 = cart_items(
        user_id=2, album_id=2, quantity=2, price=4.21)
    cart_item_4 = cart_items(
        user_id=3, album_id=2, quantity=1, price=4.21)

    cart_item_5 = cart_items(
        user_id=1, album_id=3, quantity=2, price=4.22)
    cart_item_6 = cart_items(
        user_id=2, album_id=3, quantity=1, price=4.22)

    cart_item_7 = cart_items(
        user_id=2, album_id=4, quantity=2, price=4.24)
    cart_item_8 = cart_items(
        user_id=3, album_id=4, quantity=1, price=4.24)


    db.session.add(cart_item_1)
    db.session.add(cart_item_2)
    db.session.add(cart_item_3)
    db.session.add(cart_item_4)
    db.session.add(cart_item_5)
    db.session.add(cart_item_6)
    db.session.add(cart_item_7)
    db.session.add(cart_item_8)

    db.session.commit()


def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cart_items"))

    db.session.commit()
