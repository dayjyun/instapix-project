from app.models.hashtag import db, Post_Hashtag

# Adds a demo user, you can add other users here if you want


def seed_post_hashtags():
    hashtag1 = Post_Hashtag(
        hashtag_id=1, post_id=1)
    hashtag2 = Post_Hashtag(
        hashtag_id=2, post_id=2)
    hashtag3 = Post_Hashtag(
        hashtag_id=3, post_id=3)
    hashtag4 = Post_Hashtag(
        hashtag_id=4, post_id=4)
    hashtag5 = Post_Hashtag(
        hashtag_id=5, post_id=1)
    hashtag6 = Post_Hashtag(
        hashtag_id=6, post_id=2)
    hashtag7 = Post_Hashtag(
        hashtag_id=7, post_id=3)
    hashtag8 = Post_Hashtag(
        hashtag_id=8, post_id=4)
    hashtag9 = Post_Hashtag(
        hashtag_id=9, post_id=1)
    hashtag10 = Post_Hashtag(
        hashtag_id=10, post_id=2)
    hashtag11 = Post_Hashtag(
        hashtag_id=11, post_id=3)
    hashtag12 = Post_Hashtag(
        hashtag_id=1, post_id=4)

    db.session.add(hashtag1)
    db.session.add(hashtag2)
    db.session.add(hashtag3)
    db.session.add(hashtag4)
    db.session.add(hashtag5)
    db.session.add(hashtag6)
    db.session.add(hashtag7)
    db.session.add(hashtag8)
    db.session.add(hashtag9)
    db.session.add(hashtag10)
    db.session.add(hashtag11)
    db.session.add(hashtag12)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_post_hashtags():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
