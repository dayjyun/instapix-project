from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    bio = db.Column(db.String)
    profile_image = db.Column(db.String)
    session_token = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    # following = db.relationship('User', primaryjoin=(follows.c.follower_id == id), back_populates='follows')
    # followers = db.relationship('Follow', primaryjoin=(follows.c.user_id == id), back_populates='follows')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
