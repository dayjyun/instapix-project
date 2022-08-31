from crypt import methods
from flask import Blueprint, session, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.api.auth_routes import authenticate
from app.api.follow_routes import get_follows_for_user, get_users_follows
from app.api.like_routes import get_likes_by_post
from app.forms.create_post import CreatePostForm
from app.forms.comment_forms import CreateCommentForm, EditCommentForm
from app.models import db, User, Follow, Post, Like, Comment, follow
from app.seeds import follows


post_routes = Blueprint('posts', __name__, url_prefix='/posts')


#** get all posts on database **#
@post_routes.route('/explorer')
@login_required
def get_all_posts():
    all_posts_query = Post.query.order_by(Post.created_at.desc())
    all_posts = [post.to_dict() for post in all_posts_query]
    return {"posts": all_posts}
    # TODO return only post_url?
    # TODO return random order of all posts


#** Get all posts from the following feed **#
@post_routes.route('/')
@login_required
def get_posts():
    following = get_follows_for_user(current_user.get_id())['Followers']

    return {"following": following}
    # TODO Return only id, username, profile_image, [post details], [likes], [comments]


#** Get post by post id **#
@post_routes.route('/<int:post_id>')
@login_required
def post_details(post_id):
    all_posts = Post.query.filter(Post.id == post_id)
    post = [post.to_dict() for post in all_posts]
    likes = get_likes_by_post(post_id)
    if post:
        return {"posts": post, "likes": (len(likes) + 1)}
        # TODO return [likes], [comments]
    else:
        return {"message": "Post not found"}


#** Create a post **#
@post_routes.route('/form', methods=["GET", "POST"])
@login_required
def create_post():
    form = CreatePostForm()
    if form.validate_on_submit():
        data = form.data
        new_post = Post(
            user_id=current_user.id,
            caption=data['caption'],
            post_url=data['post_url'],
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post.to_dict()
    return render_template('create_post.html', form=form)

# --------------------------- COMMENT ROUTES ------------------------------->

#get all comments on a specific post, using post_id
@post_routes.route('/<int:post_id>/comments')
@login_required
def get_post_comments(post_id):
    # added post query for 404 return
    post = Post.query.get(post_id)

    if post:
        comments = Comment.query.filter(Comment.post_id == post_id)
        if comments:
            return jsonify(Comments=[comment.to_dict() for comment in comments])

    return jsonify(message="Post couldn't be found", statusCode=404)


#create a comment providing user_id, post_id, and body
@post_routes.route('/<int:post_id>/comments', methods=['POST'])
@login_required
def create_comment(post_id):
    form = CreateCommentForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    post = Post.query.get(post_id)

    #check if post exists
    if not post:
        return jsonify(message="Post couldn't be found", statusCode=404)

    if form.validate_on_submit():
        data = form.data

        comment = Comment(user_id=current_user.id,
                          post_id=post_id,
                          body=data['body'])

        db.session.add(comment)
        db.session.commit()
        print(comment)
        return comment.to_dict()
    # return render_template('create_comment_form.html', form=form)


#** Edit a post **#
@post_routes.route('/<int:post_id>/edit', methods=["GET", "POST"])
@login_required
def edit_post(post_id):
    form = CreatePostForm()
    if form.validate_on_submit():
        data = form.data
        post = Post.query.get(post_id)
        post.caption = data['caption']
        post.post_url = data['post_url']
        db.session.commit()
        return redirect('/api/posts')
    return render_template('edit_post.html', form=form)


#** Delete a post **#
@post_routes.route('/delete/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)
    if post:
        if post.user_id == current_user.id:
            db.session.delete(post)
            db.session.commit()
            return redirect('/api/posts/explorer')
        else:
            return {"message": "You cannot delete this post"}
    else:
        return {"message": "Post not found"}
