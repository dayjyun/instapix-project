from .db import db
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    caption = db.Column(db.String(2000), nullable=False)
    post_url = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    comments = db.relationship('Comment', back_populates='posts')
    likes = db.relationship("Like", back_populates='posts')

    # hashtags = db.relationship('Hashtag', secondary=post_hashtag, back_populates='posts')
