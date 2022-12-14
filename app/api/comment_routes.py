from flask import Blueprint, jsonify, render_template, request
from flask_login import login_required, current_user
from datetime import datetime

from app.models import db, Comment
from ..forms.comment_forms import CreateCommentForm, EditCommentForm


comment_routes = Blueprint('comments', __name__)

#get a single comment using comment id
@comment_routes.route('/<int:comment_id>')
@login_required
def get_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        return comment.to_dict()
    return jsonify(message="Comment couldn't be found", statusCode=404), 404


#edit a comment using comment_id, by providing a body and updating update_at
@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):
    form = EditCommentForm()

    # without this line, will cause SyntaxError -- not valid JSON
    form["csrf_token"].data = request.cookies["csrf_token"]

    comment = Comment.query.get(comment_id)

    #check if comment exists
    if not comment:
        return jsonify(message="Comment couldn't be found", statusCode=404), 404

    #check if user is authorized
    if current_user.id != comment.user_id:
        return jsonify(message='Not authorized', statusCode=401), 401

    #edit comment
    if form.validate_on_submit():
        data = form.data
        comment.body = data['body']
        comment.updated_at = datetime.now()

        db.session.add(comment)
        db.session.commit()

        return comment.to_dict()


#delete a comment using comment_id
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)

    #check if comment exists
    if not comment:
        return jsonify(message="Comment couldn't be found", statusCode=404), 404

    #check if user is owner of comment
    if current_user.id != comment.user_id:
        return jsonify(message='Forbidden', statusCode=403), 403

    db.session.delete(comment)
    db.session.commit()

    return jsonify(message="Successfully deleted", statusCode=200), 200
