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
    # users = db.relationship('User', back_populates='posts')

    # hashtags = db.relationship('Hashtag', secondary=post_hashtag, back_populates='posts')

    def to_dict(self):
            return {
                'id': self.id,
                "user_id": self.user_id,
                "caption": self.caption,
                "post_url": self.post_url,
                "created_at": self.created_at,
                "updated_at": self.updated_at,
            }
