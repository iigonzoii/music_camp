from app.models import db, shoppingcart_items, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shoppingCart():
    cart_item_1 = shoppingcart_items(
        user_id=1, album_id=3,
        quantity=2, price=4.22
    )
    cart_item_2 = shoppingcart_items(
        user_id=1, album_id=4,
        quantity=2, price=4.24
    )
    cart_item_3 = shoppingcart_items(
        user_id=3, album_id=1,
        quantity=2, price=4.19
    )
    cart_item_4 = shoppingcart_items(
        user_id=3, album_id=2,
        quantity=2, price=4.21
    )

    db.session.add(cart_item_1)
    db.session.add(cart_item_2)
    db.session.add(cart_item_3)
    db.session.add(cart_item_4)


def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shoppingcart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shoppingcart_items"))

    db.session.commit()
