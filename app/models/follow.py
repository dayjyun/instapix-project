from .db import db
from datetime import datetime


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # follower_id = db.Column(
    #     db.Integer, db.ForeignKey('users.id'), nullable=False)
    # created_at = db.Column(db.DateTime, default=datetime.now())
    # updated_at = db.Column(db.DateTime, default=datetime.now())


    follows_id = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.today())

    users = db.relationship('User', back_populates='follows')
    # follows = db.relationship('User', back_populates='follows')
    # followed_by = db.relationship('User', back_populates='follows')
