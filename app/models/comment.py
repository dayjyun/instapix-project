from .db import db
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    body = db.Column(db.String)
    created_at = db.Column(db.Datetime, default=datetime.now())
    updated_at = db.Column(db.Datetime, default=datetime.now())

    posts = db.relationship('Post', back_populates="comments")
    users = db.relationship('User', back_populates="comments")
