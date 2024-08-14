from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Optional, NumberRange

class ProductForm(FlaskForm):
    album_id = IntegerField('Album ID', validators=[DataRequired()])
    cd_amount = IntegerField('CD Quantity')
    cd_price = FloatField('CD Price')
    vinyl_amount = IntegerField('Vinyl Quantity')
    vinyl_price = FloatField('Vinyl Price')
    cassette_amount = IntegerField('Cassette Quantity')
    cassette_price = FloatField('Cassette Price')
    digital_amount = IntegerField('Digital Quantity')
    digital_price = FloatField('Digital Price')
  