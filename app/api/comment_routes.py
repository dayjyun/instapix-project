from crypt import methods
from flask import Blueprint, jsonify, redirect, url_for, render_template
from flask_login import login_required, current_user
from app.models import User, Comment
from ..models.db import db
from ..forms.comment_form import CommentForm
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

#edit a comment using comment id
@comment_routes.route('/<int:comment_id>/edit', methods = ['GET', 'PUT'])
@login_required
def edit_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    form = CommentForm()
    # print(comment)
    if form.validate_on_submit():
        print('DATA =========================>', form.body.data)
        comment.body = form.body.data
        print(comment.body)
        comment.updated_at = datetime.now()

        db.session.add(comment)
        db.session.commit()

        return redirect(f'/api/comments/{comment.id}')
    return render_template('comment_form.html', comment=comment, form=form)





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
