from app.models.post import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        user_id=1, caption='my first instapix post!', post_url='photos_url')
    post2 = Post(
        user_id=2, caption='went to the local cafe for a coffee. Yum!', post_url='photos_url')
    post3 = Post(
        user_id=3, caption='my dog sleeping--how cute is he?', post_url='photos_url')
    post4 = Post(
        user_id=4, caption='happy hour with the family!', post_url='photos_url')
    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
