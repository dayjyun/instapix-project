from crypt import methods
from flask import Blueprint, session, jsonify
from flask_login import login_required, current_user
from app.api.auth_routes import authenticate
from app.models import User
from app.models.follow import Follow
from app.models.post import Post
from app.seeds import follows

post_routes = Blueprint('posts', __name__, url_prefix='/posts')

@post_routes.route('/me')
@login_required
def me():
    c_user = User.query.get(current_user.get_id())
    return c_user.to_dict()

# # Get posts from users that current user follows(Takes user to feed)
@post_routes.route('/')
@login_required
def get_posts():
    c_user = User.query.get(current_user.get_id())
    follows = Follow.query.filter(c_user.id == Follow.follows_id)
    follows = [follow.to_dict() for follow in follows][0]
    # follows_posts = Post.query.filter(Post.user_id == follows["user_id"])
    post = Post.query.filter(Post.user_id == c_user.id)
    post_id = [p.to_dict() for p in post]
    return {"POST": post_id}

    # return {"Follows": follows['user_id']}
    # return {"person we follow": follows_posts}


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



# FOLLOWS
# Get all followers of a users
# follows = Follow.query.filter(c_user.id == Follow.follows_id)
