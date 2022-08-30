from .db import db
from datetime import datetime


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    follows_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today())

    users = db.relationship('User', back_populates='follows')

    def users_i_follow(self):
        return {
            "following_id": self.follows_id,
            "username": self.users.username
        }

    def following_me(self):
        return {
            "follower_id": self.user_id
        }

    # follows = db.relationship('User', back_populates='follows')
    # followed_by = db.relationship('User', back_populates='follows')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'follows_id': self.follows_id
        }


# users_table = db.session.query(Follow, User).join(User).all()
