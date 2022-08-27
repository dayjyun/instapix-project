from .db import db
from datetime import DateTime


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    follower_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=DateTime.now())
    updated_at = db.Column(db.DateTime, default=DateTime.now())

    # users = db.relationship('User', back_populates='follows')
    # follower = db.relationship('User', back_populates='follows')
