from flask import Blueprint
from app.models import Hashtag, Post, post, post_hashtag
from flask_login import login_required

hashtag_routes = Blueprint('hashtags', __name__)


# GET ALL HASHTAGS
@hashtag_routes.route('/hashtags')
@login_required
def get_all_hash():
    all = Hashtag.query.all()
    all = [hashtag.to_dict() for hashtag in all]
    return {'Hashtags': all}


# GET HASHTAGS FOR A POST
@hashtag_routes.route('/posts/<post_id>/hashtags')
@login_required
def tags_for_post(post_id):
    tags = Hashtag.query.join(post_hashtag, post_hashtag.post_id).filter(
        post_hashtag.post_id == post_id)
    for tag in tags:
        print("ID ========>", tag.id)
    return {'hello': 'hello'}
