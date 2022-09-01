from flask import Blueprint, jsonify
from app.models import Follow, User, db
from flask_login import current_user, login_required

follow_routes = Blueprint('follows', __name__)


# Get all accounts that follow the user
@follow_routes.route('/users/<int:user_id>/followers')
@login_required
def get_follows_for_user(user_id):
    user = User.query.get(user_id)
    follows = Follow.query.filter(Follow.follows_id == user_id)

    if user:
        return {'My_Followers': [follow.to_dict_followers() for follow in follows]}
    else:
        return jsonify(message='User could not be found.', status_code=404), 404



# Get all accounts that the user follows
@follow_routes.route('/users/<int:user_id>/follows')
@login_required
def get_users_follows(user_id):
    user = User.query.get(user_id)
    follows = Follow.query.filter(Follow.user_id == user_id).all()

    if user:
        return {'I_Follow': [follow.to_dict_follows() for follow in follows]}
    else:
        return jsonify(message='User could not be found.', status_code=404), 404



#Follow a user (post)
@follow_routes.route('/users/<int:user_id>/post', methods=['POST'])
@login_required
def follow_user(user_id):
    user_id= int(user_id)
    user = User.query.get(user_id)
    is_already_following = Follow.query.filter(Follow.user_id == current_user.id).all()

    for follow in is_already_following:
        if follow.follows_id == user_id:
            return jsonify(message='You are already following this user.', status_code=404), 404

    if user:
        new_follow = Follow(
            user_id = current_user.id,
            follows_id = user_id
        )
        db.session.add(new_follow)
        db.session.commit()
        return jsonify(message='Successfully followed.', status_code=200), 200

    else:
        return jsonify(message='User could not be found.', status_code=404), 404



#Unfollow a user (delete)
@follow_routes.route('/users/<int:user_id>/delete', methods=['DELETE'])
@login_required
def unfollow_user(user_id):
    user_id= int(user_id)
    user = User.query.get(user_id)
    #get all follows for the user whose page we're on
    all_my_follows = Follow.query.filter(current_user.id == Follow.user_id).all()

    if user:
        for follow in all_my_follows:
            if follow.follows_id == user_id:
                my_follow = Follow.query.get(follow.id)
                db.session.delete(my_follow)
                db.session.commit()
                return jsonify(message='Successfully unfollowed.', status_code=404), 404

        return jsonify(message='You cannot unfollow someone you do not follow.', status_code=404), 404

    else:
        return jsonify(message='User could not be found.', status_code=404), 404
