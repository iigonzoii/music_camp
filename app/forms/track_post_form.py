from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class TrackPostForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=100)])
    file = StringField('String', validators=[DataRequired()])
    # Using FileField lets client drag and drop so long as frontend is set up to handle it. Good future enhancement idea
    duration = IntegerField('Duration', validators=[DataRequired()])
