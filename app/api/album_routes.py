from flask import Blueprint, request
from sqlalchemy.orm import joinedload
from app.models import Album, Review, Track, PurchaseItem, db
from app.forms import AlbumForm

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
        joinedload(Album.reviews).joinedload(Review.reviewer),
        joinedload(Album.purchases).joinedload(PurchaseItem.user)
    ).filter(Album.id == album_id).first()


    if not album_details:
        return {'errors': {'message': 'Album not found'}}, 404

    return {'Album': album_details.to_dict()}, 200
