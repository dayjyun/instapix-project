from .db import db
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
                # 'id': self.id,
                'follows_id': self.follows_id,
                'user_id': self.user_id,
            }
