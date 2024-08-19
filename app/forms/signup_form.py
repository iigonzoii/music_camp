from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, Optional, Length, URL
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(), Length(max=40, message='First Name cannot exceed 40 characters')])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(max=40, message='Last Name cannot exceed 40 characters')])
    city = StringField('city', validators=[DataRequired(), Length(max=40)])
    state = StringField('state', validators=[DataRequired(), Length(max=40)])
    email = StringField('Email', validators=[DataRequired(), Email(), Length(max=255)])
    username = StringField('Username', validators=[DataRequired(), Length(max=40)])
    password = PasswordField('Password', validators=[DataRequired()])
    bio = StringField('Bio', validators=[Optional(), Length(max=250)])
    spotify = StringField('Spotify', validators=[Optional(), Length(max=40)])
    instagram = StringField('Instagram', validators=[Optional(), Length(max=40)])
    website = StringField('Website', validators=[Optional(), Length(max=40), URL()])
    facebook = StringField('Facebook', validators=[Optional(), Length(max=40)])
    profile_img_url = StringField('Profile Image URL', validators=[Optional(), Length(max=200), URL()])
    banner_img_url = StringField('Banner Image URL', validators=[Optional(), Length(max=200), URL()])
    background_img_url = StringField('Background Image URL', validators=[Optional(), Length(max=200), URL()])
