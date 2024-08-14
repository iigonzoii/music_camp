from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Track, Album
from app.forms import TrackPostForm


track_routes = Blueprint('tracks', __name__)

# Delete track
@track_routes.route('/<int:track_id>', methods=['DELETE'])
@login_required
def delete_track(track_id):
    """
    Deletes a track by id
    """
    theTrack = Track.query.filter_by(id=track_id, user_id=current_user.id).first()
    if not theTrack:
        return {'errors': {'message': 'Track not found or not authorized'}}, 404

    db.session.delete(theTrack)
    db.session.commit()
    return {'message': "Track successfully deleted"}, 200


# Get all tracks.
# Not an MVP feature
# @track_routes.route('/')
# def all_tracks():
#     """
#     Get all current user's tracks
#     """
#     tracks = Track.query.all()
#     if not tracks:
#         return {'errors': {'message': 'No existing tracks'}}, 404
#     return {'tracks': [track.to_dict() for track in tracks]}, 200


# # Get all tracks by Artist id (Current User)
# @track_routes.route('/current')
# @login_required
# def album_tracks():
#     """
#     Get all current user's tracks
#     """
#     tracks = Track.query.filter_by(user_id=current_user.id).all()
#     if not tracks:
#         return {'errors': {'message': 'No existing tracks'}}, 404
#     return {'tracks': [track.to_dict() for track in tracks]}, 200
