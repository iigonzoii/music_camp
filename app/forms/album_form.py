from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Optional, Length, URL, NumberRange

class AlbumForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    band = StringField('Band', validators=[DataRequired(), Length(max=50)])
    title = StringField('Title', validators=[DataRequired(), Length(max=50)])
    cover_image_url = StringField('Cover Image URL', validators=[DataRequired(), URL(), Length(max=200)])
    description = StringField('Description', validators=[DataRequired()])
    producer = StringField('Producer', validators=[DataRequired()])
    genre = StringField('Genre', validators=[DataRequired()])
    tags = StringField('Tags', validators=[Optional()])
    price = FloatField('Price', validators=[DataRequired()])
    stock = IntegerField('Stock', validators=[DataRequired()])
    cd_amount = IntegerField('CD Quantity', validators=[DataRequired(), NumberRange(min=0)])
    cd_price = FloatField('CD Price', validators=[DataRequired(), NumberRange(min=0)])
    vinyl_amount = IntegerField('Vinyl Quantity', validators=[DataRequired(), NumberRange(min=0)])
    vinyl_price = FloatField('Vinyl Price', validators=[DataRequired(), NumberRange(min=0)])
    cassette_amount = IntegerField('Cassette Quantity', validators=[DataRequired(), NumberRange(min=0)])
    cassette_price = FloatField('Cassette Price', validators=[DataRequired(), NumberRange(min=0)])
    digital_amount = IntegerField('Digital Quantity', validators=[DataRequired(), NumberRange(min=0)])
    digital_price = FloatField('Digital Price', validators=[DataRequired(), NumberRange(min=0)])
    