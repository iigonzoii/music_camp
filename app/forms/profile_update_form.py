from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Optional

class ProfileUpdateForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(), Length(max=40)])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(max=40)])
    city = StringField('City', validators=[DataRequired(), Length(max=40)])
    state = StringField('State', validators=[DataRequired(), Length(max=40)])
    username = StringField('Username', validators=[DataRequired(), Length(max=50)])
    bio = StringField('Bio', validators=[Optional(), Length(max=1000)])
    spotify = StringField('Spotify', validators=[Optional(), Length(max=255)])
    instagram = StringField('Instagram', validators=[Optional(), Length(max=255)])
    website = StringField('Website', validators=[Optional(), Length(max=255)])
    facebook = StringField('Facebook', validators=[Optional(), Length(max=255)])
    profile_img_url = StringField('Profile Image URL', validators=[Optional(), Length(max=255)])
    banner_img_url = StringField('Banner Image URL', validators=[Optional(), Length(max=255)])
    background_img_url = StringField('Background Image URL', validators=[Optional(), Length(max=255)])
