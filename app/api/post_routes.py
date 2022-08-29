from crypt import methods
from flask import Blueprint, session, jsonify, render_template, redirect
from flask_login import login_required, current_user
from app.api.auth_routes import authenticate
from app.forms.create_post import CreatePostForm
from app.models import User
from app.models.follow import Follow
from app.models.post import Post
from app.seeds import follows

post_routes = Blueprint('posts', __name__, url_prefix='/posts')


#** get all posts on database **#
@post_routes.route('/all')
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
@post_routes.route('/<int:post_id>')
@login_required
def post_details(post_id):
    all_posts = Post.query.filter(Post.id == post_id)
    post = [post.to_dict() for post in all_posts]
    if post:
        return {"posts": post}
    else:
        return {"message": "Post not found"}


#** Create a post **#
@post_routes.route('/form', methods=["GET", "POST"])
# @login_required
def create_post():
    form = CreatePostForm()
    if form.validate_on_submit():
        return redirect('/')
    return render_template('create_post.html', form=form)

# removed ** Get the edit form for a post **

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

# return redirect('/api/users')
