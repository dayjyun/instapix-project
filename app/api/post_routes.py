from crypt import methods
from flask import Blueprint, session, jsonify
from flask_login import login_required, current_user
from app.api.auth_routes import authenticate
from app.models import User
from app.models.follow import Follow
from app.models.post import Post
from app.seeds import follows

post_routes = Blueprint('posts', __name__, url_prefix='/posts')


#** get all posts on database **#
@post_routes.route('/all-posts')
@login_required
def get_all_posts():
    all_posts_query = Post.query.all()
    all_posts = [post.to_dict() for post in all_posts_query]
    return {"posts": all_posts}


#** Get all posts from the user feed **#
# @post_routes.route('/')
# @login_required
# def get_posts():
#     pass


#** Get post by post id **#
@post_routes.route('/<post_id>')
@login_required
def post_details(post_id):
    all_posts = Post.query.filter(Post.id == post_id)
    post = [post.to_dict() for post in all_posts]
    if post:
        return {"posts": post}
    else:
        return {"message": "Post not found"}


#** Create a post **#
# @post_routes.route('/', methods=["POST"])
# @login_required
# def create_post():
#     c_user = User.query.get(current_user.get_id())
#     pass


#** Get the edit form for a post **#
# @post_routes.route('/<post_id>/edit')
# @login_required
# def get_post_edit_form(post_id):
#     c_user = User.query.get(current_user.get_id())
#     pass

#** Edit a post **#


# @post_routes.route('/<post_id>', methods=["PUT"])
# @login_required
# def update_post_edit_form():
#     c_user = User.query.get(current_user.get_id())
#     pass
#** Delete a post **#
# @post_routes.route('/<post_id>', methods=['DELETE'])
# @login_required
# def delete_post(post_id):
#     c_user = User.query.get(current_user.get_id())
#     pass
