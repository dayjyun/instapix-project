from flask.cli import AppGroup
from .users import seed_users, undo_users
from .follows import seed_follows, undo_follows
from .comments import seed_comments, undo_comments
from .posts import seed_posts, undo_posts

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_follows()
    seed_posts()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_follows()
    seed_posts()
    undo_comments()
    # Add other undo functions here
