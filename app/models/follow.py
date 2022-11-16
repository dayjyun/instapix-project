from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    follows_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today())

    users = db.relationship('User', back_populates='follows')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'follows_id': self.follows_id
        }

    def to_dict_following(self):
        return {
            'user_id': self.user_id,
            'username': self.users.username,
            'profile_image': self.users.profile_image,
            'Posts': [post.to_dict() for post in self.users.following_posts()],
        }

    def to_dict_follows(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'follows_id': self.follows_id,
        }

    def to_dict_id(self):
        return {
            'id': self.follows_id
        }

    def __repr__(self):
        return f"<id:{self.id} user_id:{self.user_id} follows_id: {self.follows_id}>"
