from app.models.user import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='Lition', bio='This is about me', profile_image='This_url')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Last', bio='This is about me', profile_image='This_url')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Brown', bio='This is about me', profile_image='This_url')
    ricky = User(
        username='ricky', email='ricky@aa.io', password='password', first_name='Ricky', last_name='Ro', bio='This is about me', profile_image='This_url')
    rick = User(
        username='rickjames', email='rick@aa.io', password='password', first_name='Rick', last_name='James', bio='This is about me', profile_image='This_url')
    skimby = User(
        username='skimbysally', email='a@aa.io', password='password', first_name='Sally', last_name='Skimby', bio='This is about me', profile_image='This_url')
    jan = User(
        username='wickedjan', email='b@aa.io', password='password', first_name='Jan', last_name='Wicked', bio='This is about me', profile_image='This_url')
    felipe = User(
        username='thotfelipe', email='c@aa.io', password='password', first_name='Felipe', last_name='Thot', bio='This is about me', profile_image='This_url')
    kev = User(
        username='kevsawesome', email='d@aa.io', password='password', first_name='Kev', last_name='Awesome', bio='This is about me', profile_image='This_url')
    hotgirl = User(
        username='hotgirl916', email='e@aa.io', password='password', first_name='Hot', last_name='Girl', bio='This is about me', profile_image='This_url')
    hotboy = User(
        username='hotboy408', email='f@aa.io', password='password', first_name='Hot', last_name='Boy', bio='This is about me', profile_image='This_url')
    very = User(
        username='very_thoughtful', email='g@aa.io', password='password', first_name='Very', last_name='Thoughtful', bio='This is about me', profile_image='This_url')
    much = User(
        username='thoughtful_very_much', email='h@aa.io', password='password', first_name='Much', last_name='Thoughtful', bio='This is about me', profile_image='This_url')
    brian = User(
        username='Brian_Moore', email='i@aa.io', password='password', first_name='Brian', last_name='Moore', bio='This is about me', profile_image='This_url')
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(ricky)
    db.session.add(rick)
    db.session.add(skimby)
    db.session.add(jan)
    db.session.add(felipe)
    db.session.add(kev)
    db.session.add(much)
    db.session.add(very)
    db.session.add(brian)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
