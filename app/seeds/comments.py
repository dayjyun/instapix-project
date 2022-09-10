from app.models.comment import db, Comment
from faker import Faker
faker = Faker()


# Adds a demo user, you can add other users here if you want
def seed_comments():
    for i in range(100):
        comment = Comment(
            post_id=faker.random_int(min=1, max=20),
            user_id=faker.random_int(min=1, max=12),
            body=faker.sentence(),

        )
        db.session.add(comment)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
