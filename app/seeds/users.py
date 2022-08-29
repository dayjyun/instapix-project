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
    kevin = User(
        username='kevin', email='kevin@aa.io', password='password', first_name='Kevin', last_name='Barrios', bio='cool kev', profile_image='This_url'
    )
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(ricky)
    db.session.add(kevin)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
