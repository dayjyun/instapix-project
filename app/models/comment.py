from tkinter import CASCADE
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    body = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    posts = db.relationship('Post', back_populates=add_prefix_for_prod("comments"))
    users = db.relationship('User', back_populates=add_prefix_for_prod("comments"))

    def to_dict(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user_id,
            "body": self.body,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
            "user": self.users.to_dict()
        }

    def comment_content(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user_id,
            "body": self.body,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
