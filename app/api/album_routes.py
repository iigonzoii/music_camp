from flask import Blueprint, request
from sqlalchemy.orm import joinedload
from flask_login import current_user, login_required
from app.models import Album, Review, Track, PurchaseItem, ProductType, db
from app.forms import AlbumForm, UpdateAlbumForm, ReviewPostForm, TrackPostForm


album_routes = Blueprint('albums', __name__)

# Get all albums
@album_routes.route('/', methods=['GET'])
def all_albums():
    albums = Album.query.all()
    if not albums:
        return {'errors': {'message': 'No existing albums'}}, 404

    albums_dict = [album.to_dict() for album in albums]
    return {'albums': albums_dict}, 200


# Get album details by id
@album_routes.route('/<int:album_id>', methods=['GET'])
def album_by_id(album_id):
    album_details = db.session.query(Album).options(
        joinedload(Album.tracks),
        joinedload(Album.product_types),
        joinedload(Album.reviews).joinedload(Review.reviewer),
        joinedload(Album.purchases).joinedload(PurchaseItem.user)
    ).filter(Album.id == album_id).first()


    if not album_details:
        return {'errors': {'message': 'Album not found'}}, 404

    return {'Album': album_details.to_dict()}, 200


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
            price=form.price.data,
            stock=form.stock.data
        )

        db.session.add(new_album)
        db.session.flush()

        product_types = []
        if form.cd_amount.data:
            product_types.append(ProductType(album_id=new_album.id, type='CD', amount=form.cd_amount.data, price=form.cd_price.data))
        if form.vinyl_amount.data:
            product_types.append(ProductType(album_id=new_album.id, type='Vinyl', amount=form.vinyl_amount.data, price=form.vinyl_price.data))
        if form.cassette_amount.data:
            product_types.append(ProductType(album_id=new_album.id, type='Cassette', amount=form.cassette_amount.data, price=form.cassette_price.data))
        if form.digital_amount.data:
            product_types.append(ProductType(album_id=new_album.id, type='Digital', amount=form.digital_amount.data, price=form.digital_price.data))

        db.session.add_all(product_types)
        db.session.commit()


        return new_album.to_dict(), 201

    return {'errors': form.errors}, 400


# Delete album by id
@album_routes.route('/<int:album_id>', methods=['DELETE'])
@login_required
def delete_album(album_id):
    kill_album = Album.query.filter_by(id=album_id, user_id=current_user.id).first()
    if not kill_album:
        return {'errors': {'message': 'Album not found or not authorized'}}, 404

    db.session.delete(kill_album)
    db.session.commit()
    return {'message': "Album successfully deleted"}, 200


# Update album by id
@album_routes.route('/<int:album_id>', methods=['PUT'])
@login_required
def update_album(album_id):
    album_update = Album.query.filter_by(id=album_id, user_id=current_user.id).first()
    if not album_update:
        return {'errors': {'message': 'Album not found'}}, 404
    if album_update.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    form = UpdateAlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        album = Album(
            user_id=current_user.id,
            band=form.band.data,
            title=form.title.data,
            product_type=form.product_type.data,
            cover_image_url=form.cover_image_url.data,
            description=form.description.data,
            producer=form.producer.data,
            genre=form.genre.data,
            tags=form.tags.data,
            price=form.price.data,
            stock=form.stock.data
        )

        db.session.add(album)
        db.session.commit()
        return album.to_dict()
    return form.errors, 401


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
            stars=form.data['stars']
        )
        db.session.add(theReview)
        db.session.commit()
        return theReview.to_dict(), 201
    return form.errors, 401
