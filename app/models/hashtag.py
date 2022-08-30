from .db import db
from datetime import datetime

post_hashtag = db.Table(
    "post_hashtags",
    db.Model.metadata,
    db.Column('hashtag_id', db.ForeignKey('hashtags.id'), primary_key = True),
    db.Column('post_id', db.ForeignKey('posts.id'), primary_key = True)
)

class Hashtag(db.Model):
    __tablename__ = 'hashtags'

    id = db.Column(db.Integer, primary_key=True)
    hashtag_value = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    # posts = db.relationship('Post', secondary=post_hashtag, back_populates='hashtags')
