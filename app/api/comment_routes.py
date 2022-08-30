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
    return jsonify(message="Comment couldn't be found", statusCode=404)

# create a comment providing user_id, post_id, and body
# change this route to a POST at --> /posts/<int:post_id>/comments
@comment_routes.route('/new', methods=['GET', 'POST'])
@login_required
def create_comment():
    form = CreateCommentForm()

    if request.method != 'GET':
        if form.validate_on_submit():
            data = form.data
            comment = Comment(user_id=current_user.id,
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

    if request.method != 'GET':
        comment = Comment.query.get(comment_id)

        # check if comment exists
        if not comment:
            return jsonify(message="Comment couldn't be found", statusCode=404)

        #check if user is authenticated
        if current_user.id != comment.user_id:
            return jsonify(message='Authentication required', statusCode='401')

        # edit comment
        if form.validate_on_submit():
            data = form.data
            comment.body = data['body']
            comment.updated_at = datetime.now()

            db.session.add(comment)
            db.session.commit()

            return comment.to_dict()
    return render_template('edit_comment_form.html', form=form)

# delete a comment using comment_id
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
    return jsonify(message="Comment couldn't be found", statusCode=404)



# fetch('localhost:5000/api/comments/2/edit', {
#   method: 'PUT',
#   body: JSON.stringify({
#     body: 'THIS IS AN EDIT',
#   }),
#   headers: {
#     'Content-type': 'application/json; charset=UTF-8'
#   }
# })
# .then(res => res.json())
# .then(console.log)
