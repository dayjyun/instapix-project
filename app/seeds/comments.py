from app.models.comment import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        post_id=1, user_id=2, body='super cool post!')
    comment2 = Comment(
        post_id=1, user_id=3, body='i agree! super cool post!')
    comment3 = Comment(
        post_id=2, user_id=1, body='nice looking coffee. ')
    comment4 = Comment(
        post_id=3, user_id=3, body='my dog is cuter! >:)')
    comment5 = Comment(
        post_id=4, user_id=4, body='this is my post and i think it is very cool!')
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
