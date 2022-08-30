from crypt import methods
from flask import Blueprint, session, jsonify, render_template, redirect
from flask_login import login_required, current_user
from app.api.auth_routes import authenticate
from app.forms.create_post import CreatePostForm
from app.models import db, User, Follow, Post, Like, Comment
from app.seeds import follows

post_routes = Blueprint('posts', __name__, url_prefix='/posts')


#** get all posts on database **#
@post_routes.route('/explorer')
@login_required
def get_all_posts():
    all_posts_query = Post.query.order_by(Post.created_at.desc())
    all_posts = [post.to_dict() for post in all_posts_query]
    return {"posts": all_posts}
    #  TODO return random order of all posts
    # return render template 'all_posts.html' all_posts=all_posts


#** Get all posts from the following feed **#
# Get all Posts
@post_routes.route('/')
def get_posts():
    """May need to change method for posts.users_i_follow()"""
    c_user = User.query.get(current_user.get_id())
    user_following = Follow.query.filter(Post.user_id == c_user.id).order_by(Post.created_at.desc())
    user_following = [posts.users_i_follow() for posts in user_following]

    likes = Like.query.filter(Like.post_id == Post.id)
    likes = [like.to_dict() for like in likes]
    return {"feed": user_following, "likes": likes}
    # TODO should return post info not user info
    # return render template 'following_feed.html'


#** Get post by post id **#
# Get details of a Post form an id
@post_routes.route('/<int:post_id>')
@login_required
def post_details(post_id):
    all_posts = Post.query.filter(Post.id == post_id)
    post = [post.to_dict() for post in all_posts]
    if post:
        return {"posts": post}
        # return render template 'post.html' post=post
    else:
        return {"message": "Post not found"}


#** Create a post **#
# Create a Post
@post_routes.route('/form', methods=["GET", "POST"])
# @login_required
def create_post():
    form = CreatePostForm()
    if form.validate_on_submit():
        data = form.data
        new_post = Post(
            user_id = current_user.id,
            caption = data['caption'],
            post_url = data['post_url'],
        )
        db.session.add(new_post)
        db.session.commit()
        return redirect('/api/posts')
        # return render template 'following_feed.html'
    return render_template('create_post.html', form=form)



#** Edit a post **#
# Edit a Post
# @post_routes.route('/<post_id>', methods=["PUT"])
# @login_required
# def update_post_edit_form():
#     c_user = User.query.get(current_user.get_id())
#     pass


#** Delete a post **#
# Delete a Post
# @post_routes.route('/delete/<post_id>', methods=['DELETE'])
# @login_required
# def delete_post(post_id):
    # get all posts
    # get post by ID
    # verify it's your post
    # if post exists, delete
    # if not your post, error
    # post not found
    # c_user = User.query.get(current_user.get_id())
    # all_posts = Post.query.filter(Post.id == c_user.id)
    # post = [post.to_dict() for post in all_posts]
    # if post:

    # return {"posts": post}
