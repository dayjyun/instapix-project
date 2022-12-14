from flask import Blueprint, jsonify
from app.models import db, Like, User, Post
from flask_login import login_required, current_user


like_routes = Blueprint('likes', __name__)


# GET ALL LIKES

@like_routes.route('/likes')
@login_required
def get_all_likes():
    likes = Like.query.all()
    likes = [like.to_dict() for like in likes]
    return jsonify({'likes': likes})

# GET LIKES BY POST ID


@like_routes.route('/posts/<int:post_id>/likes')
@login_required
def get_likes_by_post(post_id):
    likes = Like.query.filter(Like.post_id == post_id)
    likes = [like.to_dict() for like in likes]
    if likes:
        return jsonify({'likes': likes}), 200
    else:
        return jsonify({'message': 'There are no likes', 'status_code': 200}), 200

# LIKE A POST


@like_routes.route('/posts/<int:post_id>/likes', methods=['POST'])
@login_required
def like_a_post(post_id):
    curr_user = current_user.id
    exists = Like.query.filter(Like.user_id == current_user.id,
                               Like.post_id == int(post_id))
    exists = [like.to_dict() for like in exists]
    if exists:
        return jsonify({'message': 'like already exists'}), 409
    else:
        new_like = Like(user_id=curr_user,
                        post_id=post_id
                        )
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict(), 200

#
# UNLIKE A POST BY POST ID


@like_routes.route('/posts/<int:post_id>/likes', methods=['DELETE'])
@login_required
def delete_a_like(post_id):
    post = Post.query.get(post_id)

    if post:
        like = Like.query.filter(Like.user_id == int(current_user.id),
                                 Like.post_id == int(post_id))
        exist = [a.to_dict() for a in like]
        if exist:
            like.delete()
            db.session.commit()
            return jsonify(exist[0]), 200

        else:
            return jsonify({'message': "Like doesn't exist", 'status_code': '404'}), 404
    else:
        return jsonify({"message": "Post couldn't be found", "status_code": "404"}), 404
