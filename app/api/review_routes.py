from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Review, Album
from app.forms import ReviewPostForm, ReviewEditForm


review_routes = Blueprint('reviews', __name__)

# Get all reviews by current user
@review_routes.route('/current')
@login_required
def user_reviews():
    """
    Get all current user's reviews
    """
    reviews = Review.query.filter_by(user_id=current_user.id).all()
    if not reviews:
        return {'errors': {'message': 'No existing reviews'}}, 404
    return {'reviews': [review.to_dict() for review in reviews]}



# Update review
@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    """
    Updates a user's review for an album
    """
    theReview = Review.query.get(review_id)
    if not theReview:
        return {'errors': {'message': 'Review not found'}}, 404
    if theReview.user_id != current_user.id:
        return {'errors': {'message': 'Unauthorized'}}, 401

    form = ReviewEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        theReview.review=form.data['review'],
        theReview.stars=form.data['stars']
        # db.session.add(theReview)
        db.session.commit()
        return theReview.to_dict()
    return form.errors, 401





# Delete review
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    """
    Deletes a review by id
    """
    theReview = Review.query.filter_by(id=review_id, user_id=current_user.id).first()
    if not theReview:
        return {'errors': {'message': 'Review not found or not authorized'}}, 404

    db.session.delete(theReview)
    db.session.commit()
    return {'message': "Review successfully deleted"}, 200





# Album route
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


# Album route
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
        review = Review(
            user_id=current_user.id,
            album_id=album_id,
            review=form.data['review'],
            stars=form.data['stars']
        )
        db.session.add(new_review)
        db.session.commit()
        return review.to_dict()
    return form.errors, 401
