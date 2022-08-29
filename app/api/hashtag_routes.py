from flask import Blueprint
from app.models import Hashtag

hashtag_routes = Blueprint('hashtags', __name__)

# GET ALL HASHTAGS


@hashtag_routes.route('/hashtags')
def get_all_hash():
    all = Hashtag.query.all()
    all = [hashtag.to_dict() for hashtag in all]
    return {'Hashtag': all}
