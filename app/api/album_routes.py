from flask import Blueprint, request
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from app.models import Album, Review, Track, PurchaseItem, ProductType, User, db
from app.forms import AlbumForm, UpdateAlbumForm, ReviewPostForm, TrackPostForm, ProductForm


album_routes = Blueprint('albums', __name__)

# Get all albums
@album_routes.route('/', methods=['GET'])
def all_albums():
    albums = Album.query.all()
    if not albums:
        return {'errors': {'message': 'No existing albums'}}, 404

    albums_dict = [album.to_dict() for album in albums]
    return {'albums': albums_dict}, 200


# Get all albums by User
@album_routes.route('/current', methods=['GET'])
def albums_by_user():
    user_id = current_user.id
    albums = Album.query.filter_by(user_id=user_id).all()
    if not albums:
        return {'errors': {'message': 'No albums found for this user'}}, 404

    return {'albums': [album.to_dict() for album in albums]}, 200


# Get album details by id
@album_routes.route('/<int:album_id>', methods=['GET'])
def album_by_id(album_id):
    album_details = db.session.query(Album).options(
        joinedload(Album.tracks),
        joinedload(Album.products),
        joinedload(Album.reviews).joinedload(Review.reviewer),
        joinedload(Album.purchases).joinedload(PurchaseItem.user),
    ).filter(Album.id == album_id).first()

    # Gets all related albums by the artist of the albums details route and adds to query
    artist_id = album_details.user_id
    albums = db.session.query(Album).filter(Album.user_id == artist_id).all()

    artist_info = db.session.query(User).filter(User.id == artist_id).all()


    if not album_details:
        return {'errors': {'message': 'Album not found'}}, 404

    return {'Album': album_details.to_dict(), 'UserInfo': [artist.to_dict() for artist in artist_info] ,'UserAlbums': [ album.to_dict() for album in albums]}, 200



# Post album
@album_routes.route('/', methods=['GET', 'POST'])
@login_required
def create_album():
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_album = Album(
            user_id=current_user.id,
            band=form.band.data,
            title=form.title.data,
            cover_image_url=form.cover_image_url.data,
            description=form.description.data,
            producer=form.producer.data,
            genre=form.genre.data,
            tags=form.tags.data,
        )

        db.session.add(new_album)
        db.session.commit()

        return new_album.to_dict(), 201

    return {'errors': form.errors}, 400


# Post product_types
@album_routes.route('/products/<int:album_id>/', methods=['POST'])
@login_required
def create_products(album_id):
    data = request.get_json()

    if not data or not isinstance(data, list):
        return {'errors': 'Invalid data'}, 400

    products = []
    for item in data:
        product_type = item.get('type')
        amount = item.get('amount')
        price = item.get('price')

        if product_type and (amount is not None or price is not None):
            try:
                amount = int(amount) if amount is not None else None
                price = float(price) if price is not None else None
            except ValueError:
                return {'errors': 'Invalid data type for amount or price'}, 400

            product = ProductType(
                album_id=album_id,
                type=product_type,
                amount=amount,
                price=price
            )
            products.append(product)
            db.session.add(product)

    if products:
        db.session.commit()
        return {'products': [product.to_dict() for product in products]}, 201

    return {'errors': 'No valid products provided'}, 400




# Delete album by id
@album_routes.route('/<int:album_id>', methods=['DELETE'])
@login_required
def delete_album(album_id):
    album = Album.query.get(album_id)
    if not album or album.user_id != current_user.id:
        return {'errors': 'Album not found or unauthorized'}, 404

    # Delete all related product types first
    ProductType.query.filter_by(album_id=album_id).delete()

    # Then delete the album
    db.session.delete(album)
    db.session.commit()

    return {'message': 'Album and related products deleted successfully'}, 200


@album_routes.route('/<int:album_id>/', methods=['PUT'])
@login_required
def update_album(album_id):
    album_update = Album.query.filter(Album.id == album_id).first()

    if not album_update:
        return {'errors': {'message': 'Album not found'}}, 404
    if album_update.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    form = UpdateAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        album_update.band = form.band.data
        album_update.title = form.title.data
        album_update.cover_image_url = form.cover_image_url.data
        album_update.description = form.description.data
        album_update.producer = form.producer.data
        album_update.genre = form.genre.data
        album_update.tags = form.tags.data

        db.session.commit()
        return album_update.to_dict()
    return form.errors, 401


@album_routes.route('/<int:album_id>/products', methods=['PUT'])
@login_required
def update_product_types(album_id):
    print(f"Updating products for album ID: {album_id}")

    # Fetch the album
    album = Album.query.get(album_id)
    if not album:
        print(f"Album with ID {album_id} not found")
        return {'errors': {'message': 'Album not found'}}, 404

    if album.user_id != current_user.id:
        print(f"User {current_user.id} is not authorized to update album ID {album_id}")
        return {'errors': {'message': 'Unauthorized'}}, 401

    # Get and print the request data
    data = request.get_json()
    print(f"Data received: {data}")

    if not data or not isinstance(data, list):
        print("Invalid data format. Expected a list of product types.")
        return {'errors': 'Invalid data format. Expected a list of product types.'}, 400

    # Print each product data
    products_to_update = []
    for index, product_data in enumerate(data):
        print(f"Product {index}: {product_data}")

        product_type = product_data.get('type')
        amount = product_data.get('amount')
        price = product_data.get('price')
        
        if not product_type or amount is None or price is None:
            print(f"Missing required fields in product data: {product_data}")
            return {'errors': 'Missing required fields in product data.'}, 400

        # Create a new product type
        product = ProductType(
            album_id=album_id,
            type=product_type,
            amount=amount,
            price=price
        )
        # Append to the list of products to update
        products_to_update.append(product)
        print(f"Created product: {product.to_dict()}")

    # Delete existing product types for the album
    ProductType.query.filter_by(album_id=album_id).delete()

    # Add all new products to the session
    db.session.bulk_save_objects(products_to_update)
    db.session.commit()

    # Print the final list of product types
    updated_products = ProductType.query.filter_by(album_id=album_id).all()
    print(f"Updated products: {[product.to_dict() for product in updated_products]}")

    return {'album_id': album_id, 'product_types': [product.to_dict() for product in updated_products]}


# Track route
# Create a track by album id
@album_routes.route('/<int:album_id>', methods=['POST'])
@login_required
def new_track(album_id):
    """
    Creates a track for an album
    """
    album = Album.query.get(album_id)
    if not album:
        return {'errors': {'message': 'Album not found'}}, 400
    if album.user_id != current_user.id:
        return {'errors': {'message': 'This album does not belong to the user'}}, 400

    form = TrackPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        theTrack = Track(
            user_id=current_user.id,
            album_id=album_id,
            name=form.data['name'],
            file_url=form.data['file'],
            duration=form.data['duration']
        )
        db.session.add(theTrack)
        db.session.commit()
        return theTrack.to_dict(), 201
    return form.errors, 401

# Track route
# Get all tracks by album id
@album_routes.route('/<int:album_id>/tracks')
def album_tracks(album_id):
    """
    Get all tracks for an album
    """
    tracks = Track.query.filter_by(album_id=album_id).all()
    if not tracks:
        return {'errors': {'message': 'No existing tracks'}}, 404
    return {'tracks': [track.to_dict() for track in tracks]}


# Review route
# Get all reviews by album id
@album_routes.route('/<int:album_id>/reviews')
def album_reviews(album_id):
    """
    Get all reviews for an album
    """
    reviews = Review.query.filter_by(album_id=album_id).all()
    if not reviews:
        return {'errors': {'message': 'No existing reviews'}}, 404
    return {'reviews': [review.to_dict() for review in reviews]}


# Review route
# Create a review by album id
@album_routes.route('/<int:album_id>/reviews', methods=['POST'])
@login_required
def new_review(album_id):
    """
    Creates a review for an album
    """
    album = Album.query.get(album_id)
    if not album:
        return {'errors': {'message': 'Album not found'}}, 400
    existing_review = Review.query.filter_by(user_id=current_user.id, album_id=album_id).first()
    if existing_review:
        return {'errors': {'message': 'This user has an existing review for the album'}}, 400

    form = ReviewPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        theReview = Review(
            user_id=current_user.id,
            album_id=album_id,
            review=form.data['review'],
            # stars=form.data['stars']
        )
        db.session.add(theReview)
        db.session.commit()
        return theReview.to_dict(), 201
    return form.errors, 401
