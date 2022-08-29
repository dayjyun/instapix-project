from crypt import methods
import json
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
    return jsonify(message="Comment couldn't be found", statusCode=404)

# create a comment providing user_id, post_id, and body
@comment_routes.route('/new', methods=['GET', 'POST'])
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

# edit a comment using comment_id, and providing a body and updating update_at
@comment_routes.route('/<int:comment_id>/edit', methods=['GET', 'PUT', 'POST'])
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

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
    return jsonify(message="Comment couldn't be found", statusCode=404)



# fetch('http://localhost:5000/api/comments/7', {
#   method: 'DELETE'
# })
#   .then(res => res.json())
#   .then(console.log(res))
#   .then(console.log)
