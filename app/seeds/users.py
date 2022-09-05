from app.models.user import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demoLition', email='demo@aa.io', password='password', first_name='Demo', last_name='User', bio='This is about me', profile_image='https://image.shutterstock.com/image-photo/demolition-building-excavator-breaks-old-260nw-2006150615.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Last', bio='This is about me', profile_image='https://i.dailymail.co.uk/1s/2022/01/13/11/52879753-10397951-Snowball_appears_to_be_shy_in_this_shot_but_this_cannot_stop_him-a-1_1642074249114.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Brown', bio='This is about me', profile_image='https://tvline.com/wp-content/uploads/2022/01/king-of-the-hill-bobby.png?w=620&h=440&crop=1')
    ricky = User(
        username='ricky', email='ricky@aa.io', password='password', first_name='Ricky', last_name='Ro', bio='This is about me', profile_image='https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=11e949fc5d06576bc8b80ec192896753')
    rick = User(
        username='rickjames', email='rick@aa.io', password='password', first_name='Rick', last_name='James', bio='This is about me', profile_image='https://allthatsinteresting.com/wordpress/wp-content/uploads/2021/08/portrait-of-rick-james.jpg')
    skimby = User(
        username='skimbysally', email='a@aa.io', password='password', first_name='Sally', last_name='Skimby', bio='This is about me', profile_image='http://images.goodsmile.info/cgm/images/product/20201202/10469/78051/medium/124b42aafad17eb1c88eef135ee878ad.jpg')
    jan = User(
        username='wickedjan', email='b@aa.io', password='password', first_name='Jan', last_name='Wicked', bio='This is about me', profile_image='https://pbs.twimg.com/profile_images/764810617601527808/CurnOlxK_400x400.jpg')
    felipe = User(
        username='thotfelipe', email='c@aa.io', password='password', first_name='Felipe', last_name='Thot', bio='This is about me', profile_image='https://www.thesprucepets.com/thmb/nZpYXJxDYAHa4vMjCQjlTWNRMaA=/938x938/smart/filters:no_upscale()/33351631_260594934684461_1144904437047754752_n-5b17d77604d1cf0037f3ea5a.jpg')
    kev = User(
        username='kevsawesome', email='d@aa.io', password='password', first_name='Kev', last_name='Awesome', bio='This is about me', profile_image='https://m.media-amazon.com/images/I/81Y+P59yklL._SS500_.jpg')
    hotgirl = User(
        username='hotgirl916', email='e@aa.io', password='password', first_name='Hot', last_name='Girl', bio='This is about me', profile_image='https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Megan_Thee_Stallion_-_Hot_Girl_Summer.png/220px-Megan_Thee_Stallion_-_Hot_Girl_Summer.png')
    hotboy = User(
        username='hotboy408', email='f@aa.io', password='password', first_name='Hot', last_name='Boy', bio='This is about me', profile_image='https://previews.123rf.com/images/paleka/paleka1410/paleka141000203/33042361-cool-boy.jpg')
    very = User(
        username='very_thoughtful', email='g@aa.io', password='password', first_name='Very', last_name='Thoughtful', bio='This is about me', profile_image='https://thumbor.bigedition.com/cute-small-rat-wrapped-in-knitted-plaid/mvSiWoCH-3skivKqJ6yFj1iNJ2Y=/69x0:1184x836/480x360/filters:format(webp):quality(80)/granite-web-prod/74/18/74189ff23b0b466eb22cf82ee4bf1140.jpeg')
    much = User(
        username='thoughtful_very_much', email='h@aa.io', password='password', first_name='Much', last_name='Thoughtful', bio='This is about me', profile_image='https://external-preview.redd.it/KCPDpreDy0nsZ5wBLj5z64-hWpkKknN9xNY4emKxYE8.jpg?auto=webp&s=1650851b7ad79cf978183be5290022a99e6a4b9d')
    brian = User(
        username='Brian_Moore', email='i@aa.io', password='password', first_name='Brian', last_name='Moore', bio='This is about me', profile_image='https://media.comicbook.com/wp-content/uploads/2013/12/brian-griffin-family-guy.jpg')
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
