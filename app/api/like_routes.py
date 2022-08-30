from flask import Blueprint, jsonify
from app.models import db, Like, User, Post
from flask_login import login_required, current_user


like_routes = Blueprint('likes', __name__)


# GET LIKES FOR POST BY POST ID
@like_routes.route('/posts/<int:post_id>/likes')
@login_required
def get_likes_by_post(post_id):
    likes = Like.query.filter(Like.post_id == int(post_id))
    return {'likes': [like.to_dict() for like in likes]}


# LIKE A POST BASED ON POST ID
@like_routes.route('/posts/<int:post_id>/likes', methods=['POST'])
@login_required
def like_a_post(post_id):
    curr_user = current_user.get_id()
    new_like = Like(user_id=curr_user,
                    post_id=int(post_id)
                    )
    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()


# UNLIKE A POST BY POST ID
@like_routes.route('/posts/<int:post_id>', methods=['DELETE'])
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
            return jsonify({"message": "Successfully deleted", "status_code": "200"})
        else:
            return jsonify({'message': "Like doesn't exist", 'status_code': '404'})
    else:
        return jsonify({"message": "Post couldn't be found", "status_code": "404"})
