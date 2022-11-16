from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post_Hashtag(db.Model):
    __tablename__ = 'post_hashtags'

    id = db.Column(db.Integer, primary_key=True)
    hashtag_id = db.Column(db.Integer, db.ForeignKey(
        'hashtags.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    hashtag = db.relationship('Hashtag', back_populates='post_hashtags')
    post = db.relationship('Post', back_populates='post_hashtags')



class Hashtag(db.Model):
    __tablename__ = 'hashtags'

    id = db.Column(db.Integer, primary_key=True)
    hashtag_value = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    post_hashtags = db.relationship(
        "Post_Hashtag", back_populates="hashtag", cascade="all, delete-orphan", lazy="joined")

    def to_dict(self):
        return {
            'id': self.id,
            'hashtag_value': self.hashtag_value
        }

    def __repr__(self):
        return f"<id:{self.id} hashtag_value:{self.hashtag_value}>"
