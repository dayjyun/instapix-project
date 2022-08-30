from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Follow

user_routes = Blueprint('users', __name__)

# Get all users in the database
@user_routes.route('/all')
# @login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

# Get user by user_id
@user_routes.route('/<int:user_id>')
# @login_required
def user(user_id):
    user = User.query.get(user_id)
    return user.to_dict()

# Get current user (me)
@user_routes.route('/')
@login_required
def get_me():
    c_user = User.query.get(current_user.get_id())
    return c_user.to_dict()

# Get current user's posts

# Get a user's following list
# @user_routes.route('/following')
# @login_required
# def get_followers():
#     c_user = User.query.get(current_user.get_id())
#     follows = Follow.query.filter(Follow.follows_id == c_user.id)
#     follows = [follow.users_i_follow() for follow in follows]
#     return {"Following": follows}
