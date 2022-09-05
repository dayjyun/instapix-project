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
    comment6 = Comment(
        post_id=5, user_id=1, body='i love this post!')
    comment7 = Comment(
        post_id=2, user_id=2, body='i love coffee!')
    comment8 = Comment(
        post_id=3, user_id=4, body='i love dogs!')
    comment9 = Comment(
        post_id=4, user_id=1, body='i love this post #4!')
    comment10 = Comment(
        post_id=2, user_id=3, body='i love coffee the most!')
    comment11 = Comment(
        post_id=3, user_id=2, body='i love dogs the most!')
    comment12 = Comment(
        post_id=4, user_id=3, body='Post #4 is lit!')
    comment13 = Comment(
        post_id=6, user_id=1, body='i love this post!')
    comment14 = Comment(
        post_id=6, user_id=2, body='This post is okay!')
    comment15 = Comment(
        post_id=6, user_id=3, body='Sick photo!!')
    comment16 = Comment(
        post_id=6, user_id=4, body='This is a cool post!')
    comment17 = Comment(
        post_id=7, user_id=1, body='i love this post!')

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)
    db.session.add(comment13)
    db.session.add(comment14)
    db.session.add(comment15)
    db.session.add(comment16)
    db.session.add(comment17)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
