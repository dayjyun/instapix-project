from crypt import methods
from flask import Blueprint, session
from flask_login import login_required, current_user
from app.models import User

post_routes = Blueprint('posts', __name__, url_prefix='/posts')


# # Get posts from users that current user follows(Takes user to feed)
@post_routes.route('/')
@login_required
def get_posts():
#     # c_user = User.query.get(current_user.id)
#     c_user = current_user()
#     # if I am logged in
#     # if current_user.is_authenticated
#     # import people I follow and verify I am following user
#     # return the posts of the people I follow
    pass
#     return f"{c_user}"

@post_routes.route('/<post_id>')
@login_required
def post_details(post_id):
    pass

@post_routes.route('/<post_id>/edit')
@login_required
def get_post_edit_form(post_id):
    pass

@post_routes.route('/<post_id>', methods=["PUT"])
@login_required
def update_post_edit_form():
    pass

@post_routes.route('/', methods=["POST"])
@login_required
def create_post():
    pass

@post_routes.route('/<post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    pass
