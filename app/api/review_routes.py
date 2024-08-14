from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review
from app.forms import ReviewEditForm


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
    return {'reviews': [review.to_dict() for review in reviews]}, 200



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
        theReview.review=form.data['review']
        # theReview.stars=form.data['stars']
        db.session.add(theReview)
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
