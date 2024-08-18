from flask.cli import AppGroup
from .albums import seed_albums, undo_albums
from .tracks import seed_tracks, undo_tracks
from .users import seed_users, undo_users
from .reviews import seed_reviews, undo_reviews
from .product_type_seeds import seed_products, undo_products
from .purchase_items import seed_purchaseItems, undo_purchaseItems

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_purchaseItems()
        undo_products()
        undo_reviews()
        undo_tracks()
        undo_albums()
        undo_users()

    seed_users()
    seed_albums()
    seed_tracks()
    seed_reviews()
    seed_products()
    seed_purchaseItems()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_albums()
    undo_tracks()
    undo_reviews()
    undo_products()
    undo_purchaseItems()
    # Add other undo functions here
