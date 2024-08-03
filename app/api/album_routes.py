from flask import Blueprint, request
from app.models import Album, db
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
