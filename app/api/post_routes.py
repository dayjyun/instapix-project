from crypt import methods
from flask import Blueprint, session
from flask_login import login_required, current_user
from app.api.auth_routes import authenticate
from app.models import User
from app.models.follow import Follow

post_routes = Blueprint('posts', __name__, url_prefix='/posts')


# # Get posts from users that current user follows(Takes user to feed)
@post_routes.route('/')
@login_required
def get_posts():
    c_user = User.query.get(current_user.get_id())
    follows = Follow.query.filter(Follow.follows_id)
    # user_id_in_follows = Follow.query.filter(Follow.user_id)
    # follows_id == c_user.id?
    #
    return {"follows": [follow.to_dict() for follow in follows]}
    # return {"follows": follows, "user_id": user_id_in_follows}
    # return {"current_user": c_user.id}
    # pass

@post_routes.route('/<post_id>')
@login_required
def post_details(post_id):
    c_user = User.query.get(current_user.get_id())
    pass

@post_routes.route('/<post_id>/edit')
@login_required
def get_post_edit_form(post_id):
    c_user = User.query.get(current_user.get_id())
    pass

@post_routes.route('/<post_id>', methods=["PUT"])
@login_required
def update_post_edit_form():
    c_user = User.query.get(current_user.get_id())
    pass

@post_routes.route('/', methods=["POST"])
@login_required
def create_post():
    c_user = User.query.get(current_user.get_id())
    pass

@post_routes.route('/<post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    c_user = User.query.get(current_user.get_id())
    pass
