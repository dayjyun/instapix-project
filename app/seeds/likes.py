from app.models.like import db, Like


# Adds a demo user, you can add other users here if you want
def seed_likes():
    like1 = Like(
        user_id=1, post_id=9)
    like2 = Like(
        user_id=2, post_id=8)
    like3 = Like(
        user_id=3, post_id=7)
    like4 = Like(
        user_id=4, post_id=6)
    like5 = Like(
        user_id=5, post_id=5)
    like6 = Like(
        user_id=6, post_id=4)
    like7 = Like(
        user_id=7, post_id=3)
    like8 = Like(
        user_id=8, post_id=2)
    like9 = Like(
        user_id=9, post_id=1)
    like10 = Like(
        user_id=10, post_id=1)
    like11 = Like(
        user_id=11, post_id=2)
    like12 = Like(
        user_id=12, post_id=3)
    like13 = Like(
        user_id=1, post_id=4)
    like14 = Like(
        user_id=2, post_id=5)
    like15 = Like(
        user_id=3, post_id=6)
    like16 = Like(
        user_id=4, post_id=7)
    like17 = Like(
        user_id=5, post_id=8)
    like18 = Like(
        user_id=6, post_id=9)
    like19 = Like(
        user_id=7, post_id=1)
    like20 = Like(
        user_id=8, post_id=2)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.add(like9)
    db.session.add(like10)
    db.session.add(like11)
    db.session.add(like12)
    db.session.add(like13)
    db.session.add(like14)
    db.session.add(like15)
    db.session.add(like16)
    db.session.add(like17)
    db.session.add(like18)
    db.session.add(like19)
    db.session.add(like20)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_likes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
