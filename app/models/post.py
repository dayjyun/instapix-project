from .db import db
from datetime import datetime
from .comment import Comment


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    caption = db.Column(db.String(2000), nullable=False)
    post_url = db.Column(db.String(2000), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    comments = db.relationship('Comment', back_populates='posts')
    likes = db.relationship("Like", back_populates='posts')

    # users = db.relationship('User', back_populates='posts')
    post_hashtags = db.relationship(
        "Post_Hashtag", back_populates="post", cascade="all, delete-orphan", lazy="joined")

    # hashtags = db.relationship('Hashtag', secondary=post_hashtag, back_populates='posts')

    def num_comments(self):
        return len(self.comments)

    def num_likes(self):
        return len(self.likes)

    def get_comments(self):
        return Comment.query.filter_by(post_id=self.id).all()

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "caption": self.caption,
            "post_url": self.post_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            'likes': self.num_likes(),
        }

    # Returns number of comments on a post
    def to_dict_num_comments(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "caption": self.caption,
            "post_url": self.post_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            'likes': self.num_likes(),
            "comments": self.num_comments(),
        }

    # returns the contents of a post, the number of likes and comment details
    def post_details(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "caption": self.caption,
            "post_url": self.post_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            'likes': self.num_likes(),
            "comments": {comments.id: comments.comment_content() for comments in self.comments}
        }
