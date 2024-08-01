import click
from flask.cli import AppGroup

# Import the seed functions
from .seed_users import seed_users
from .seed_albums import seed_albums
from .seed_tracks import seed_tracks
from .seed_reviews import seed_reviews
from .seed_wishlist_items import seed_wishlist
from .seed_shopping_cart import seed_shoppingCart

# Create a seed group to hold our commands
seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed_all():
    seed_users()
    seed_albums()
    seed_tracks()
    seed_reviews()
    click.echo('Seeded all data!')

@seed_commands.command('users')
def seed_users_command():
    seed_users()
    click.echo('Seeded users!')

@seed_commands.command('albums')
def seed_albums_command():
    seed_albums()
    click.echo('Seeded albums!')

@seed_commands.command('tracks')
def seed_tracks_command():
    seed_tracks()
    click.echo('Seeded tracks!')

@seed_commands.command('reviews')
def seed_reviews_command():
    seed_reviews()
    click.echo('Seeded reviews!')

@seed_commands.command('wishlist')
def seed_reviews_command():
    seed_wishlist()
    click.echo('Seeded wishlist!')

@seed_commands.command('wishlist')
def seed_reviews_command():
    seed_wishlist()
    click.echo('Seeded wishlist!')

@seed_commands.command('shopping_cart')
def seed_reviews_command():
    seed_shoppingCart()
    click.echo('Seeded shopping cart!')
