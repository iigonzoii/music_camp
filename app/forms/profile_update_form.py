from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, URLField
from wtforms.validators import DataRequired, Length, Optional

class ProfileUpdateForm(FlaskForm):
    first_name = StringField('First Name', validators=[Optional(), Length(max=40)])
    last_name = StringField('Last Name', validators=[Optional(), Length(max=40)])
    city = StringField('City', validators=[Optional(), Length(max=40)])
    state = StringField('State', validators=[Optional(), Length(max=40)])
    username = StringField('Username', validators=[Optional(), Length(max=50)])
    bio = TextAreaField('Bio', validators=[Optional(), Length(max=1000)])
    spotify = URLField('Spotify', validators=[Optional(), Length(max=255)])
    instagram = URLField('Instagram', validators=[Optional(), Length(max=255)])
    website = URLField('Website', validators=[Optional(), Length(max=255)])
    facebook = URLField('Facebook', validators=[Optional(), Length(max=255)])
    profile_img_url = URLField('Profile Image URL', validators=[Optional(), Length(max=255)])
    banner_img_url = URLField('Banner Image URL', validators=[Optional(), Length(max=255)])
    background_img_url = URLField('Background Image URL', validators=[Optional(), Length(max=255)])
