from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, PurchaseItem, ProductType

purchase_routes = Blueprint('order', __name__)


@purchase_routes.route('/history')
@login_required
def get_all_purchases():
    userId = current_user.id

    collection = PurchaseItem.query.filter_by(user_id=userId).all()
    # collection = PurchaseItem.query.all()

    # if not collection:
    #     return {'errors': {'message': 'No existing purchases'}}, 404
    return {'collection': [item.to_dict() for item in collection]}, 200


@purchase_routes.route('/checkout', methods=['POST'])
@login_required
def complete_purchase():
    """
    sample JSON body for POST
    [
        {
            album_id: 1,
            type: 'CD',
            quantity: 1,
            price: 26.00
        },
        {
            album_id: 3,
            type: 'Digital',
            quantity: 2,
            price: 25.99
        }
    ]
    """
    try:
        cart = request.get_json()
        if not cart:
            return {'errors': {'message': 'No data provided'}}, 400

        purchased = []
        for item in cart:
            curr_product = ProductType.query.filter_by(album_id=item["album_id"], type=item["type"]).first()

            if curr_product is None:
                return jsonify({'errors': {'message': f'Product not found for album_id {item["album_id"]} and type {item["type"]}'}}), 404

            if int(item["quantity"]) > int(curr_product.amount):
                return {
                    'errors': {'message': "Not enough stock available"}
                }
            curr_product.amount -= item["quantity"]


            new_order = PurchaseItem(
                user_id=current_user.id,
                album_id=item["album_id"],
                type=item["type"],
                quantity=item["quantity"],
                price=item["price"]
            )

            db.session.add(new_order)
            purchased.append(new_order.to_dict())

        db.session.commit()
        return {'purchased': purchased}, 201
    except Exception as err:
        print(f"Error: {err}")
        return {'errors': {'Message': 'Internal server Error'}}, 500
