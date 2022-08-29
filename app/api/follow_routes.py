from flask import Blueprint
from app.models import Follow, User, db
from flask_login import current_user, login_required

follow_routes = Blueprint('follows', __name__)


# Get all accounts that follow the user
@follow_routes.route('/users/<user_id>/followers')
@login_required
def get_follows_for_user(user_id):
    user = User.query.get(user_id)

    follows = Follow.query\
        .filter(Follow.follows_id == user_id)

    follows_list = []
    for follow in follows:
        user_info = User.query.filter(User.id == follow.user_id).first()
        combined_data=(follow.to_dict(), user_info.to_dict())
        follows_list.append(combined_data)

    if user:
        return {'Followers': [user for user in follows_list]}
    else:
        return {
            "message": "User couldn't be found",
            "statusCode": 404
            }
    # user = User.query.get(user_id)
    # follows = Follow.query.filter(Follow.follows_id == user_id).all()
    # if user:
    #     if len(follows) == 0:
    #         return {'Followers': 0}
    #     else:
    #         return {'Followers': [follow.to_dict() for follow in follows]}
    # else:
    #     return {
    #         "message": "User couldn't be found",
    #         "statusCode": 404
    #        }


# Get all accounts that the user follows
@follow_routes.route('/users/<user_id>/follows')
@login_required
def get_users_follows(user_id):
    user = User.query.get(user_id)

    follows = Follow.query\
        .filter(Follow.user_id == user_id)

    follows_list = []
    for follow in follows:
        user_info = User.query.filter(User.id == follow.follows_id).first()
        combined_data=(follow.to_dict(), user_info.to_dict())
        follows_list.append(combined_data)

    if user:
        return {'Followers': [user for user in follows_list]}
    else:
        return {
            "message": "User couldn't be found",
            "statusCode": 404
            }
