from app.models.like import db, Like


# Adds a demo user, you can add other users here if you want
def seed_likes():
    like1 = Like(
        user_id=2, post_id=1)
    like2 = Like(
        user_id=3, post_id=1)
    like3 = Like(
        user_id=1, post_id=2)
    like4 = Like(
        user_id=3, post_id=3)
    like5 = Like(
        user_id=4, post_id=4)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_likes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
