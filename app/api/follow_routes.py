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


#Follow a user (post)
@follow_routes.route('/users/<user_id>', methods=['POST'])
@login_required
def follow_user(user_id):
    user = User.query.get(user_id)

    if user:
        new_follow = Follow(
            user_id = current_user.id,
            follows_id = user_id
        )

    else:
        return {
            "message": "User couldn't be found",
            "statusCode": 404
                }


#Unfollow a user (delete)
@follow_routes.route('/users/<user_id>/delete', methods=['DELETE'])
@login_required
def unfollow_user(user_id):
    user = User.query.get(user_id)
    #get all the user's page we're on , follows
    all_my_follows = Follow.query.filter(current_user.id == Follow.user_id).all()

    if user:
        for follow in all_my_follows:
            if follow.follows_id == int(user_id):
                my_follow = Follow.query.get(follow.id)
                db.session.delete(my_follow)
                db.session.commit()

        # updated_follows = Follow.query.filter(current_user.id == Follow.user_id).all()
        return
        # return {Follow: [follow.to_dict() for follow in updated_follows]}

    else:
        return {
            "message": "User couldn't be found",
            "statusCode": 404
                }
