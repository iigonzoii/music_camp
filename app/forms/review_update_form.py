from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class ReviewEditForm(FlaskForm):
    review = StringField('Review', validators=[DataRequired(), Length(max=100)])
    # stars = IntegerField('Stars', validators=[DataRequired(), NumberRange(min=1, max=5)])
    # stars can be removed from the model and routes at some point
