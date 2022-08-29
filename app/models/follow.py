from .db import db
from datetime import datetime


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)

    following_me = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    who_i_follow = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.today())

    users = db.relationship('User', back_populates='follows')

    def to_dict(self):
            return {
                # 'id': self.id,
                # 'who_i_follow': self.who_i_follow,
                'following_me': self.following_me,
            }
