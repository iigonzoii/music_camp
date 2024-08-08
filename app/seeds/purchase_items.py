from app.models import db, PurchaseItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_purchaseItems():
    purchased_item_1 = PurchaseItem(
        user_id=1, album_id=1,
        quantity=1, price=9.99
    )
    purchased_item_2 = PurchaseItem(
        user_id=1, album_id=2,
        quantity=2, price=9.99
    )
    purchased_item_3 = PurchaseItem(
        user_id=2, album_id=2,
        quantity=3, price=9.99
    )
    purchased_item_4 = PurchaseItem(
        user_id=2, album_id=3,
        quantity=4, price=9.99
    )
    purchased_item_5 = PurchaseItem(
        user_id=3, album_id=3,
        quantity=5, price=9.99
    )
    purchased_item_6 = PurchaseItem(
        user_id=3, album_id=4,
        quantity=6, price=9.99
    )

    db.session.add(purchased_item_1)
    db.session.add(purchased_item_2)
    db.session.add(purchased_item_3)
    db.session.add(purchased_item_4)
    db.session.add(purchased_item_5)
    db.session.add(purchased_item_6)

    db.session.commit()



def undo_purchaseItems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.purchase_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM purchase+items"))

    db.session.commit()
