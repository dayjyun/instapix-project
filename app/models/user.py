from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
from .post import Post
# from app.api.follow_routes import get_follows_for_user, get_users_follows


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

    follows = db.relationship("Follow", back_populates="users")
    comments = db.relationship("Comment", back_populates="users")
    likes = db.relationship("Like", back_populates="users")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def user_posts(self):
        return Post.query.filter_by(user_id=self.id).all()

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'bio': self.bio,
            'profile_image': self.profile_image,
            'posts': [post.to_dict() for post in self.user_posts()],


            # num of posts
            # num_posts: count posts

            # num of followers
            # 'followers': len(get_follows_for_user(self.id) + 1)

            # num of following
            # "following": len(get_users_follows(self.id) + 1)
        }
