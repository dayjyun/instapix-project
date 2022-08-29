from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User
from app.models.follow import Follow
from app.models.post import Post

me_routes = Blueprint('me', __name__, url_prefix='/me')

#** Get all details of the current user **#


@me_routes.route('/')
@login_required
def get_me():
    c_user = User.query.get(current_user.get_id())
    return c_user.to_dict()

#** Get all posts from the current user **#


@me_routes.route('/posts')
@login_required
def my_posts():
    c_user = User.query.get(current_user.get_id())
    posts = Post.query.filter(Post.user_id == c_user.id)
    post = [p.to_dict() for p in posts]
    return {"Post": post}

#** Get all users that the current user is following **#


@me_routes.route('/following')
@login_required
def get_followers():
    c_user = User.query.get(current_user.get_id())
    follows = Follow.query.filter(c_user.id == Follow.user_id)
    follows = [follow.users_i_follow() for follow in follows]
    return {"Following": follows}

# Get users following me
# @me_routes.route('/followers')
# @login_required
# def get_following():
#     c_user = User.query.get(current_user.get_id())
#     follows = Follow.query.filter(c_user.id == Follow.user_id)
#     follows = [follow.following_me() for follow in follows]
#     return {"Followers": follows}
