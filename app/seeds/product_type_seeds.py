from app.models import db, ProductType, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    album_one_cd = ProductType(
        album_id=1,
        type='CD',
        amount=1000,
        price=9.99
    )
    album_one_vinyl = ProductType(
        album_id=1,
        type='Vinyl',
        amount=500,
        price=19.99
    )
    album_two_cd = ProductType(
        album_id=2,
        type='CD',
        amount=1500,
        price=10.99
    )
    album_two_vinyl = ProductType(
        album_id=2,
        type='Vinyl',
        amount=750,
        price=20.99
    )
    album_two_cassette = ProductType(
        album_id=2,
        type='Cassette',
        amount=400,
        price=15.99
    )
    album_two_digital = ProductType(
        album_id=2,
        type='Digital',
        amount=1500000000,
        price=5.99
    )
    album_three_cd = ProductType(
        album_id=3,
        type='CD',
        amount=500,
        price=5.99
    )
    album_three_vinyl = ProductType(
        album_id=3,
        type='Vinyl',
        amount=250,
        price=10.99
    )
    album_three_cassette = ProductType(
        album_id=3,
        type='Cassette',
        amount=150,
        price=8.99
    )
    album_three_digital = ProductType(
        album_id=3,
        type='Digital',
        amount=500000000,
        price=3.99
    )
    album_four_cd = ProductType(
        album_id=4,
        type='CD',
        amount=2000,
        price=12.99
    )
    album_four_vinyl = ProductType(
        album_id=4,
        type='Vinyl',
        amount=1000,
        price=25.99
    )
    album_four_cassette = ProductType(
        album_id=4,
        type='Cassette',
        amount=600,
        price=18.99
    )
    album_four_digital = ProductType(
        album_id=4,
        type='Digital',
        amount=2000000000,
        price=7.99
    )
    album_five_cd = ProductType(
        album_id=5,
        type='CD',
        amount=1500,
        price=10.99
    )
    album_five_vinyl = ProductType(
        album_id=5,
        type='Vinyl',
        amount=750,
        price=20.99
    )
    album_five_cassette = ProductType(
        album_id=5,
        type='Cassette',
        amount=400,
        price=15.99
    )
    album_five_digital = ProductType(
        album_id=5,
        type='Digital',
        amount=1500000000,
        price=5.99
    )
    album_six_cd = ProductType(
        album_id=6,
        type='CD',
        amount=1500,
        price=10.99
    )
    album_six_vinyl = ProductType(
        album_id=6,
        type='Vinyl',
        amount=750,
        price=20.99
    )
    album_seven_cassette = ProductType(
        album_id=7,
        type='Cassette',
        amount=400,
        price=15.99
    )
    album_seven_digital = ProductType(
        album_id=7,
        type='Digital',
        amount=1500000000,
        price=5.99
    )
    album_eight_digital = ProductType(
        album_id=8,
        type='Digital',
        amount=1500000000,
        price=5.99
    )
    album_nine_cassette = ProductType(
        album_id=9,
        type='Cassette',
        amount=400,
        price=15.99
    )
    album_ten_cassette = ProductType(
        album_id=10,
        type='Cassette',
        amount=400,
        price=15.99
    )
    album_eleven_digital = ProductType(
        album_id=11,
        type='Digital',
        amount=500000000,
        price=3.99
    )
    album_twelve_digital = ProductType(
        album_id=12,
        type='Digital',
        amount=500000000,
        price=3.99
    )
    album_thirteen_digital = ProductType(
        album_id=13,
        type='Digital',
        amount=500000000,
        price=3.99
    )
    album_fourteen_vinyl = ProductType(
        album_id=14,
        type='Vinyl',
        amount=750,
        price=20.99
    )
    album_fifteen_vinyl = ProductType(
        album_id=15,
        type='Vinyl',
        amount=750,
        price=20.99
    )
    album_sixteen_cd = ProductType(
        album_id=16,
        type='CD',
        amount=1500,
        price=10.99
    )


    db.session.add_all([
        album_one_cd, album_one_vinyl,
        album_two_cd, album_two_vinyl, album_two_cassette, album_two_digital,
        album_three_cd, album_three_vinyl, album_three_cassette, album_three_digital,
        album_four_cd, album_four_vinyl, album_four_cassette, album_four_digital,album_five_cd, album_five_vinyl, album_five_cassette, album_five_digital,album_six_cd, album_six_vinyl, album_seven_cassette, album_seven_digital, album_eight_digital, album_nine_cassette, album_ten_cassette, album_eleven_digital, album_twelve_digital, album_thirteen_digital, album_fourteen_vinyl, album_fifteen_vinyl, album_sixteen_cd
    ])

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_types RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_types"))
    db.session.commit()
