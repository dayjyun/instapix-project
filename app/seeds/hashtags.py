from app.models.hashtag import db, Hashtag


# Adds a demo user, you can add other users here if you want
def seed_hashtags():
    hashtag1 = Hashtag(
        hashtag_value='#tbh')
    hashtag2 = Hashtag(
        hashtag_value='#omg')
    hashtag3 = Hashtag(
        hashtag_value='#tgif')
    hashtag4 = Hashtag(
        hashtag_value='#instapix')
    hashtag5 = Hashtag(
        hashtag_value='#coolbeans')

    db.session.add(hashtag1)
    db.session.add(hashtag2)
    db.session.add(hashtag3)
    db.session.add(hashtag4)
    db.session.add(hashtag5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_hashtags():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
