from flask.cli import AppGroup
from .users import seed_users, undo_users
from .follows import seed_follows, undo_follows
from .comments import seed_comments, undo_comments
from .posts import seed_posts, undo_posts
from .likes import seed_likes, undo_likes
from .hashtags import seed_hashtags, undo_hashtags
from .post_hashtags import seed_post_hashtags, undo_post_hashtags
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
    seed_users()
    seed_follows()
    seed_posts()
    seed_comments()
    seed_likes()
    seed_hashtags()
    seed_post_hashtags()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_follows()
    undo_posts()
    undo_comments()
    undo_likes()
    undo_hashtags()
    undo_post_hashtags()
    # Add other undo functions here
