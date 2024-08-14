from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Album, PurchaseItem, ProductType

purchase_routes = Blueprint('order', __name__)


@purchase_routes.route('/history')
# @login_required
def get_all_purchases():
    # collection = PurchaseItem.query.filter_by(user_id=current_user.id).all()
    # FOR PRODUCTION USE THE ABOVE
    userId = request.args.get('userId')

    collection = PurchaseItem.query.filter_by(user_id=userId).all()

    # if not collection:
    #     return {'errors': {'message': 'No existing purchases'}}, 404
    return {'collection': [item.to_dict() for item in collection]}, 200


@purchase_routes.route('/checkout', methods=['POST'])
@login_required
def complete_purchase():
    """
    Upon completion of transaction, a user's shopping cart items get added to a user's
    purchase_items. Data that gets entered in here would be an array of items in cart served by the
    frontend.
    [
        {
            album_id: 1,
            type: 'CD'
            quantity: 1,
        },
        {
            album_id: 3,
            type: 'Digital'
            quantity: 2,
        }
    ]
    """
    cart = request.get_json()
    purchased = []
    for item in cart:
        curr_product = ProductType.query.filter_by(album_id=item["album_id"], type=item["type"]).first()

        if int(item["quantity"]) > int(curr_product.amount):
            return {
                'errors': {'message': "Not enough stock available"}
            }

        curr_product.amount -= item["quantity"]

        new_purchase = PurchaseItem(
            user_id=current_user.id,
            album_id=item["album_id"],
            type=item["type"],
            quantity=item["quantity"],
            price=curr_product.price
        )

        db.session.add(new_purchase)
        purchased.append(new_purchase.to_dict())

    db.session.commit()

    return purchased, 201
