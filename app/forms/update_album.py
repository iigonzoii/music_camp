from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, URLField
from wtforms.validators import DataRequired, Length, Optional, Email, EqualTo

class UpdateProfileForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(), Length(max=40)])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(max=40)])
    city = StringField('City', validators=[DataRequired(), Length(max=40)])
    state = StringField('State', validators=[DataRequired(), Length(max=40)])
    email = StringField('Email', validators=[DataRequired(), Length(max=255), Email()])
    username = StringField('Username', validators=[DataRequired(), Length(max=40)])
    bio = TextAreaField('Bio', validators=[Optional(), Length(max=250)])
    spotify = StringField('Spotify', validators=[Optional(), Length(max=40)])
    instagram = StringField('Instagram', validators=[Optional(), Length(max=40)])
    website = StringField('Website', validators=[Optional(), Length(max=40)])
    facebook = StringField('Facebook', validators=[Optional(), Length(max=40)])
    profile_img_url = URLField('Profile Image URL', validators=[Optional(), Length(max=200)])
    banner_img_url = URLField('Banner Image URL', validators=[Optional(), Length(max=200)])
    background_img_url = URLField('Background Image URL', validators=[Optional(), Length(max=200)])
