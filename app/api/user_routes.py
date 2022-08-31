from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.api.follow_routes import get_follows_for_user
from app.models import User, Post

user_routes = Blueprint('users', __name__)

# Get all users in the database


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.all_users_to_dict() for user in users]}


# Get user by user_id
@user_routes.route('/<int:user_id>')
# @login_required
def user(user_id):
    user = User.query.get(user_id)
    if user:
        return user.to_dict()
    else:
        return {"Not Found": "User not found"}, 404
    # TODO include num_posts, num_followers, num_following of given user at user_id


# Get the Current User (me)
@user_routes.route('/me')
@login_required
def get_me():
    c_user = User.query.get(current_user.get_id())
    return c_user.to_dict()

#** Get all posts from a specific user **#


@user_routes.route('/<int:user_id>/posts')
@login_required
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return user.posts_to_dict()
    else:
        return {"Not Found": "User not found"}, 404
