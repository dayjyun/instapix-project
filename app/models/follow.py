from datetime import datetime
from .db import db
from datetime import datetime


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    follower_id = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.Datetime, default=datetime.now())
    updated_at = db.Column(db.Datetime, default=datetime.now())

    users = db.relationship('User', back_populates='follows')
    follower = db.relationship('User', back_populates='follows')
