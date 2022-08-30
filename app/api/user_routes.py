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
    return {'users': [user.to_dict() for user in users]}


# Get user by user_id
@user_routes.route('/<int:user_id>')
# @login_required
def user(user_id):
    user = User.query.get(user_id)
    followers = get_follows_for_user(user_id)
    return user.to_dict()
    # TODO include posts of given user at user_id


# Get the Current User (me)
@user_routes.route('/me')
@login_required
def get_me():
    c_user = User.query.get(current_user.get_id())
    return c_user.to_dict()


# # Get current user's posts
@user_routes.route('/<int:user_id>/posts')
def get_user_posts(user_id):
    user_posts = Post.query.filter(Post.user_id == user_id).order_by(Post.created_at.desc())
    posts = [post.to_dict() for post in user_posts]
    return {"posts": posts}
    # return render template 'following_feed.html'
    # TODO What if user is not found?


# Get a user's following list
