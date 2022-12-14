from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.forms.create_edit_post import CreatePostForm, EditPostForm
from app.forms.comment_forms import CreateCommentForm
from app.models import db, Follow, Post, Comment, User
from datetime import datetime


post_routes = Blueprint('posts', __name__)


#** get all posts on database **#
@post_routes.route('/explore')
@login_required
def get_all_posts():
    posts = []
    all_posts_query = Post.query.order_by(Post.created_at.desc())
    all_posts = [post.to_dict_num_comments() for post in all_posts_query]

    for post in all_posts:
        user = User.query.get(post['user_id'])
        posts.append(user)

    users = [post.user_content() for post in posts]

    for i in range(len(users)):
        all_posts[i]['User'] = users[i]

    return {'Posts': all_posts}

#** Get all posts from the following feed **#
@post_routes.route('/')
@login_required
def get_posts():
    posts = []
    all_followed_posts = Post.query.join(Follow, Follow.follows_id == Post.user_id).filter(
        Follow.user_id == current_user.id).order_by(Post.created_at.desc())

    followed_posts = [post.feed_to_dict() for post in all_followed_posts]

    all_post = followed_posts

    for post in all_post:
        user = User.query.get(post['user_id'])
        posts.append(user)

    users = [post.user_content() for post in posts]

    for i in range(len(users)):
        all_post[i]['User'] = users[i]

    return {'Posts': all_post}


#** Get post by id **#
@post_routes.route('/<int:post_id>')
@login_required
def post_details(post_id):
    all_posts = Post.query.filter(Post.id == post_id)
    post = [post.post_details() for post in all_posts]
    user = User.query.get(post[0]['user_id'])
    post[0]['User'] = user.user_content()
    if post:
        return post[0]
    else:
        return jsonify({"Not Found": "Post not found", "Status Code": 404}), 404


#** Create a post **#
@post_routes.route('/form', methods=["POST"])
@login_required
def create_post():
    data = request.json
    new_post = Post(
        user_id=current_user.id,
        caption=data['caption'],
        post_url=data['post_url'],
    )
    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict(), 201


@post_routes.route('/<int:post_id>/comments')
@login_required
def get_post_comments(post_id):
    post = Post.query.get(post_id)

    if post:
        comments = Comment.query.filter(Comment.post_id == post_id)
        if comments:
            return jsonify(Comments=[comment.to_dict() for comment in comments])

    return jsonify(message='Post not found'), 404


# create a comment providing user_id, post_id, and body
@post_routes.route('/<int:post_id>/comments', methods=['POST'])
@login_required
def create_comment(post_id):
    form = CreateCommentForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    post = Post.query.get(post_id)

    # check if post exists
    if not post:
        return jsonify({"Not Found": "Post not found", "Status Code": 404}), 404

    if form.validate_on_submit():
        data = form.data

        comment = Comment(user_id=current_user.id,
                          post_id=post_id,
                          body=data['body'])

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()

#** Edit a post **#
@post_routes.route('/<int:post_id>', methods=["PUT"])
@login_required
def edit_post(post_id):
    form = EditPostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    post = Post.query.get(post_id)
    if post:
        if post.user_id == current_user.id:
            post_caption = post.caption
            if form.validate_on_submit():
                data = form.data
                post.caption = data['caption']
                post.updated_at = datetime.now()
                db.session.add(post)
                db.session.commit()
                return post.to_dict()
            return render_template('edit_post.html', form=form, post_id=post_id, post_caption=post_caption)
        else:
            return jsonify({"Forbidden": "You cannot edit this post", "Status Code": 403}), 403
    else:
        return jsonify({"Not found": "Post not found", "Status Code": 404}), 404


#** Delete a post **#
@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)

    if post:
        if post.user_id == current_user.id:
            db.session.delete(post)
            db.session.commit()
            return post.to_dict()
        else:
            return jsonify({"Forbidden": "You cannot delete this post", "Status Code": 403}), 403
    else:
        return jsonify({"Not found": "Post not found", "Status Code": 404}), 404
