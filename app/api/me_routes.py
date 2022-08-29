from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User
from app.models.follow import Follow

me_routes = Blueprint('me', __name__, url_prefix='/me')

# Get my info
@me_routes.route('/')
@login_required
def get_me():
    c_user = User.query.get(current_user.get_id())
    return c_user.to_dict()

# Users I Follow
@me_routes.route('/followers')
@login_required
def get_followers():
    c_user = User.query.get(current_user.get_id())
    follows = Follow.query.filter(c_user.id == Follow.who_i_follow)
    return {"Follows": follows}
