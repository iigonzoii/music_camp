from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Album, PurchaseItem
# NOTE: route pending revision once Brian uploads new model for product type.

purchase_routes = Blueprint('purchase', __name__)


@purchase_routes.route('/', methods=['GET'])
@login_required
def get_all_purchases():
    collection = PurchaseItem.query.filter_by(user_id=current_user.id).all()

    if not collection:
        return {'errors': {'message': 'No existing purchases'}}, 404

    return {'collection': [item.to_dict() for item in collection]}, 200


@purchase_routes.route('/', methods=['POST'])
@login_required
def complete_purchase(data):
    """
    Upon completion of transaction, a user's shopping cart items get added to a user's
    purchase_items.

    data that gets entered in here would be an array of items in cart served by the
    frontend.
    [
        {
            album_id: 1,
            quantity: 1,
        },
        {
            album_id: 3,
            quantity: 2,
        }
    ]
    """
    purchased = []
    for product in data:
        curr_album = Album.query.filter_by(id=product.album_id)

        if product.quantity > curr_album.quantity:
            return {
                'errors': {'message': f"{curr_album.title} inventory exceeded"}
            }

        new_purchase = PurchaseItem(
            user_id=current_user.id,
            album_id=product.albumId,
            quantity=product.quantity,
            price=curr_album.price
        )

        db.session.add(new_purchase)
        purchased.append(new_purchase)

    db.session.commit()
    return purchased.to_dict(), 200
