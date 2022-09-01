from flask import Blueprint, render_template
from app.models import Hashtag, Post, Post_Hashtag, db
from flask_login import login_required, current_user
from app.forms.hashtag_form import HashtagForm

hashtag_routes = Blueprint('hashtags', __name__)


# GET ALL HASHTAGS
@hashtag_routes.route('/hashtags')
@login_required
def get_all_hash():
    all = Hashtag.query.all()
    all = [hashtag.to_dict() for hashtag in all]
    return {'Hashtags': all}


# GET HASHTAGS FOR A POST
@hashtag_routes.route('/posts/<int:post_id>/hashtags')
# @login_required
def tags_for_post(post_id):
    hashtags = Hashtag.query.join('post_hashtags').filter(
        Post_Hashtag.post_id == post_id).all()
    hashtags = [hashtag.to_dict() for hashtag in hashtags]
    return {'Hashtags': hashtags}


# CREATE A HASHTAG FOR A POST
@hashtag_routes.route('/posts/<int:post_id>/hashtags/new', methods=['GET', 'POST'])
# @login_required
def new_hashtag(post_id):
    form = HashtagForm()
    if form.validate_on_submit():
        data = form.data
        new_hashtag = Hashtag(hashtag_value=data['hashtag'])
        db.session.add(new_hashtag)
        db.session.commit()

        new_post_hashtag = Post_Hashtag(
            hashtag_id=new_hashtag.id, post_id=post_id)
        db.session.add(new_post_hashtag)
        db.session.commit()
        return {'hashtag': 'Hashtag successfully created'}
    return render_template('hashtags.html', form=form, post_id=post_id)


# DELETE A HASHTAG
# deleting a post should delete the associated hashtags
