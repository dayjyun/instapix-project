from app.models.follow import db, Follow


# Adds a demo user, you can add other users here if you want
def seed_follows():
    follow1 = Follow(
        user_id=1, follows_id=4)
    follow2 = Follow(
        user_id=2, follows_id=4)
    follow3 = Follow(
        user_id=3, follows_id=4)
    follow4 = Follow(
        user_id=6, follows_id=1)
    follow5 = Follow(
        user_id=1, follows_id=3)
    follow6 = Follow(
        user_id=2, follows_id=3)
    follow7 = Follow(
        user_id=8, follows_id=1)
    follow8 = Follow(
        user_id=1, follows_id=2)
    follow9 = Follow(
        user_id=5, follows_id=1)
    follow10 = Follow(
        user_id=3, follows_id=2)
    follow11 = Follow(
        user_id=4, follows_id=2)
    follow12 = Follow(
        user_id=1, follows_id=9)
    follow13 = Follow(
        user_id=1, follows_id=5)
    follow14 = Follow(
        user_id=1, follows_id=6)
    follow15 = Follow(
        user_id=1, follows_id=7)
    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.add(follow4)
    db.session.add(follow5)
    db.session.add(follow6)
    db.session.add(follow7)
    db.session.add(follow8)
    db.session.add(follow9)
    db.session.add(follow10)
    db.session.add(follow11)
    db.session.add(follow12)
    db.session.add(follow13)
    db.session.add(follow14)
    db.session.add(follow15)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_follows():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
