from flask import Blueprint, session, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.forms.create_edit_post import CreatePostForm, EditPostForm
from app.forms.comment_forms import CreateCommentForm
from app.models import db, Follow, Post, Comment, User
from datetime import datetime


post_routes = Blueprint('posts', __name__, url_prefix='/posts')


#** get all posts on database **#
@post_routes.route('/explorer')
@login_required
def get_all_posts():
    all_posts_query = Post.query.order_by(Post.created_at.desc())
    all_posts = [post.to_dict_num_comments() for post in all_posts_query]
    return {'Posts': all_posts}
    # TODO return random order of all posts


#** Get all posts from the following feed **#
@post_routes.route('/')  # feed
@login_required
def get_posts():
    posts = []
    all_followed_posts = Post.query.join(Follow, Follow.follows_id == Post.user_id).filter(
        Follow.user_id == current_user.id).order_by(Post.created_at.desc())
    all_post = [post.feed_to_dict() for post in all_followed_posts]

    for post in all_post:
        user = User.query.get(post['user_id'])
        posts.append(user)

    users = [post.user_content() for post in posts]

    for i in range(len(users)):
        all_post[i]['User'] = users[i]

    return {'Posts': all_post}

    # following = Follow.query.filter(
    #     Follow.follows_id == current_user.id).order_by(Follow.created_at.desc())
    # users_following = [follow.to_dict_following() for follow in following]
    # posts = Post.query.filter()
    # return {"following": users_following}

    # posts = Post.query.filter(Post.user_id == current_user.id).order_by(
    #     Post.created_at.desc()).all()
    # following_posts = Post.query.join(Follow, Follow.follows_id == Post.user_id).filter(
    #     Follow.follows_id == current_user.id).order_by(Post.created_at.desc()).all()
    # all_posts = posts + following_posts
    # return {"posts": all_posts}
    # TODO Return only [user info(done)], [post_details (post.py model)] *

    #** Get post by post id **#


@post_routes.route('/<int:post_id>')
@login_required
def post_details(post_id):
    all_posts = Post.query.filter(Post.id == post_id)
    post = [post.post_details() for post in all_posts]
    if post:
        return {"posts": post}
    else:
        return {"Not Found": "Post not found"}, 404


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
        return new_post.to_dict(), 201
    return render_template('create_post.html', form=form)

# --------------------------- COMMENT ROUTES ------------------------------->

# get all comments on a specific post, using post_id


@post_routes.route('/<int:post_id>/comments')
@login_required
def get_post_comments(post_id):
    # added post query for 404 return
    post = Post.query.get(post_id)

    if post:
        comments = Comment.query.filter(Comment.post_id == post_id)
        if comments:
            return jsonify(Comments=[comment.to_dict() for comment in comments])

    return {"Not Found": "Post not found"}, 404


# create a comment providing user_id, post_id, and body
@post_routes.route('/<int:post_id>/comments', methods=['POST'])
@login_required
def create_comment(post_id):
    form = CreateCommentForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    post = Post.query.get(post_id)

    # check if post exists
    if not post:
        return {"Not Found": "Post not found"}, 404

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

# --------------------------- COMMENT ROUTES ------------------------------->

#** Edit a post **#


@post_routes.route('/<int:post_id>/edit', methods=["GET", "POST"])
@login_required
def edit_post(post_id):
    form = EditPostForm()
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
            return {"Forbidden": "You cannot edit this post"}, 403
    else:
        return {"Not found": "Post not found"}, 404


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
            return {"Forbidden": "You cannot delete this post"}, 403
    else:
        return {"Not found": "Post not found"}, 404
