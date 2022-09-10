from app.models.post import db, Post
from faker import Faker
faker = Faker()


# Adds a demo user, you can add other users here if you want


def seed_posts():
    for i in range(100):
        post = Post(
            user_id=faker.random_int(min=1, max=12),
            caption=faker.sentence(),
            post_url=faker.image_url()
        )
        db.session.add(post)
        db.session.commit()

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
