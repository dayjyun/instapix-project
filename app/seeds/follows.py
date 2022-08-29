from app.models.follow import db, Follow


# Adds a demo user, you can add other users here if you want
def seed_follows():
    follow1 = Follow(
        following_me=1, who_i_follow=2 )
    follow2 = Follow(
        following_me=2, who_i_follow=1)
    follow3 = Follow(
        following_me=1, who_i_follow=4)
    follow4 = Follow(
        following_me=3, who_i_follow=4)
    follow5 = Follow(
        following_me=5, who_i_follow=1)
    follow6 = Follow(
        following_me=5, who_i_follow=2)

    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.add(follow4)
    db.session.add(follow5)
    db.session.add(follow6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_follows():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
