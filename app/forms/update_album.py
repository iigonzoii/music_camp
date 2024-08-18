from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Optional, Length

class UpdateAlbumForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    band = StringField('Band', validators=[DataRequired(), Length(max=50)])
    title = StringField('Title', validators=[DataRequired(), Length(max=50)])
    cover_image_url = StringField('Cover Image URL', validators=[DataRequired(), Length(max=200)])
    description = StringField('Description', validators=[DataRequired()])
    producer = StringField('Producer', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    tags = StringField('Tags', validators=[Optional()])
