from flask import Blueprint, session, request
from app.models import User, db, cart_items, Album
from flask_login import current_user, login_required

cart_routes = Blueprint('cart_items', __name__)

@cart_routes.route('/cart')
@login_required
def get_user_cartItems():
    """
    GET all user's shopping cart items
    """
    curr_username = current_user.username
    items_in_cart = cart_items.query.filter(cart_items.userId == current_user.id).all()
    return "<h1>Hello from shopping cart</h1>"

    # {
    #     f"{curr_username}_cartItems": {
    #         cartItem.id: cartItem.to_dict() for cartItem in cart_items}
    #     }

@cart_routes.route('/<int:album_id>/cart', methods=["POST"])
@login_required
def add_to_cart(albumId, quantity):
    """
    adds item to cart
    """

    curr_cart = get_user_cartItems()
    curr_album = Album.query.filter(Album.id == albumId)
    # curr_cart_item = curr_cart.query.filter(curr_cart.album_id == albumId)

    # if item is already in cart, increment quantity.
    if albumId in curr_cart:
        curr_cart.albumId.quantity += 1
        return

    new_cart_item = cart_items(
        user_id = current_user.id,
        album_id = albumId,
        quantity = quantity,
        price = curr_album.price
    )


@cart_routes.route('/<int:album_id>/cart', methods=["DELETE"])
@login_required
def remove_item_from_cart(itemId):
    req = request.get_json()
    doomedItem = cart_items.query.filter(cart_items.id == itemId).filter()
