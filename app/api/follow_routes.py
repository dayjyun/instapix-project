from flask import Blueprint
from app.models import Follow
from flask_login import current_user, login_required

follow_routes = Blueprint('follows', __name__)


# Get all accounts that follow the user
@follow_routes.route('/users/<user_id>/followers')
@login_required
def get_follows_for_user(user_id):
    users = Follow.query.filter(Follow.follows_id == user_id)
    users = [user.to_dict() for user in users]
    return {'Followers': users}
