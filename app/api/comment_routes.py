from crypt import methods
from flask import Blueprint, jsonify, redirect, url_for, render_template, request
from flask_login import login_required, current_user
from app.models import User, Comment
from ..models.db import db
from ..forms.comment_forms import CreateCommentForm, EditCommentForm
from datetime import date, datetime

comment_routes = Blueprint('comments', __name__)


# create a comment for a post using post id
# @comment_routes.route('/', methods=['POST'])
# def create_comment():
#     pass


# get a comment using comment id
@comment_routes.route('/<int:comment_id>')
@login_required
def get_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        return comment.to_dict()
        # print(db.session.current_user)
    else:
        return {'nope': 'nah'}


@comment_routes.route('/create', methods=['GET', 'POST'])
@login_required
def create_comment():
    form = CreateCommentForm()
    if form.validate_on_submit():
        data = form.data
        comment = Comment(user_id=data['user_id'],
                          post_id=data['post_id'],
                          body=data['body'])
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return render_template('create_comment_form.html', form=form)


@comment_routes.route('/<int:comment_id>/edit', methods = ['GET', 'PUT', 'POST'])
@login_required
def edit_comment(comment_id):
    form = EditCommentForm()

    if not request.method == 'GET':
        comment = Comment.query.get(comment_id)
        if form.validate_on_submit():
            data = form.data
            comment.body = data['body']
            comment.updated_at = datetime.now()
            # print(comment.body)

            db.session.add(comment)
            db.session.commit()

            return comment.to_dict()
    return render_template('edit_comment_form.html', form=form)

# @user.route('/')
# # @login_required
# def users():
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


# @user.route('/<int:id>')
# # @login_required
# def user(id):
#     user = User.query.get(id)
#     return user.to_dict()
