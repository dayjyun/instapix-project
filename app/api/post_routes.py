from flask import Blueprint
from flask_login import login_required

post_routes = Blueprint('posts', __name__, url_prefix='/posts')


# Get posts from users that current user follows(Takes user to feed)
@post_routes.route('/')
@login_required
def get_posts():
