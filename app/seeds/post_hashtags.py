from app.models.hashtag import db, post_hashtag

# Adds a demo user, you can add other users here if you want
def seed_post_hashtags():
    hashtag1 = post_hashtag.insert().values(
        hashtag_id=1, post_id=1)
    hashtag2 = post_hashtag.insert().values(
        hashtag_id=2, post_id=2)
    hashtag3 = post_hashtag.insert().values(
        hashtag_id=4, post_id=3)

    db.session.execute(hashtag1)
    db.session.execute(hashtag2)
    db.session.execute(hashtag3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_post_hashtags():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
