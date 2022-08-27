from app.models import db, Follow


# Adds a demo user, you can add other users here if you want
def seed_follows():
    follow1 = Follow(
        user_id=1, follows_id=2, followed_by_id= None)
    follow2 = Follow(
        user_id=1, follows_id=None, followed_by_id=3)
    follow3 = Follow(
        user_id=1, follows_id=4, followed_by_id=4)

    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_follows():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
