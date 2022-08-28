from flask import Blueprint
from app.models import Like, User
from flask_login import login_required, current_user
from app.models import db

like_routes = Blueprint('likes', __name__)
curr_user = User.query.get(current_user.get_id())


@like_routes.route('/posts/<post_id>/likes')
# @login_required
def likes_by_post(post_id):
    likes = Like.query.filter(Like.post_id == post_id)
    return {'likes': [like.to_dict() for like in likes]}


@like_routes.route('/posts/<post_id>/likes', methods=['POST'])
def like_a_post(post_id):
    new_like = Like(user_id=curr_user.id,
                    post_id=post_id
                    )
    db.session.add(new_like)
    db.session.commit()
    return new_like
