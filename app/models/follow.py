from .db import db
from datetime import datetime


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    follows_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today())

    users = db.relationship('User', back_populates='follows')

    # posts = db.relationship('Post', back_populates='follows')
    # follows = db.relationship('User', back_populates='follows')
    # followed_by = db.relationship('User', back_populates='follows')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'follows_id': self.follows_id
        }

    # TODO Return the ID, username, profile image, and posts from users that the current user is following *
        # }

    def to_dict_following(self):
        return {
            # 'id': self.id,
            'user_id': self.user_id,
            'username': self.users.username,
            'profile_image': self.users.profile_image,
            'Posts': [post.to_dict() for post in self.users.following_posts()],
        }

    def to_dict_follows(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'follows_id': self.follows_id,
        }

    def __repr__(self):
            return f"<id:{self.id} user_id:{self.user_id} follows_id: {self.follows_id}>"
# users_table = db.session.query(Follow, User).join(User).all()
