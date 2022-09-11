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
    huy = User(
        username='huy', email='huy@aa.io', password='password', first_name='Huy', last_name='TA', bio='Software Engineer. Contributor to this project!', profile_image='https://images.pexels.com/photos/1237119/pexels-photo-1237119.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')
    skimby = User(
        username='skimby', email='a@aa.io', password='password', first_name='Sally', last_name='Kimby', bio='Software Engineer. Contributor to this project!', profile_image='https://images.goodsmile.info/cgm/images/product/20201202/10469/78051/medium/124b42aafad17eb1c88eef135ee878ad.jpg')
    jan = User(
        username='wickedjan', email='b@aa.io', password='password', first_name='Jan', last_name='Wicked', bio='Software Engineer. Contributor to this project!', profile_image='https://pbs.twimg.com/profile_images/764810617601527808/CurnOlxK_400x400.jpg')
    felipe = User(
        username='Felipe', email='c@aa.io', password='password', first_name='Felipe', last_name='Silva', bio='Software Engineer. Contributor to this project!', profile_image='https://www.thesprucepets.com/thmb/nZpYXJxDYAHa4vMjCQjlTWNRMaA=/938x938/smart/filters:no_upscale()/33351631_260594934684461_1144904437047754752_n-5b17d77604d1cf0037f3ea5a.jpg')
    kev = User(
        username='kevsawesome', email='d@aa.io', password='password', first_name='Kev', last_name='Awesome', bio='Software Engineer. Contributor to this project!', profile_image='https://m.media-amazon.com/images/I/81Y+P59yklL._SS500_.jpg')
    tom = User(
        username='tomthecat', email='e@aa.io', password='password', first_name='Tom', last_name='Cat', bio='I enjoy long walks on the beach and a warm bowl of milk.', profile_image='https://i.pinimg.com/736x/aa/2e/f0/aa2ef0ac37db19de28da92aa1b297ca6.jpg')
    Jerry = User(
        username='jerrythemouse', email='f@aa.io', password='password', first_name='Jerry', last_name='Mouse', bio='I love cheese!', profile_image='https://img.favpng.com/4/0/6/tom-and-jerry-jerry-mouse-tom-cat-cocktail-rum-png-favpng-riT4hgBx3q0i410nxK67NWBq9.jpg')
    very = User(
        username='finnthehuman', email='g@aa.io', password='password', first_name='Finn', last_name='Human', bio='A full time human hero!', profile_image='https://i.etsystatic.com/14675880/r/il/7a1178/1314818595/il_fullxfull.1314818595_r231.jpg')
    much = User(
        username='jakeman', email='h@aa.io', password='password', first_name='Jake', last_name='Dog', bio='Loves to cook and beat up the bad guys', profile_image='https://external-preview.redd.it/1vvk5GSaP8Dd5i6OYa0BDJ9bP8SdE7U4lKhEj2IsH-0.jpg?auto=webp&s=e8017f84d806c2591b0674072945a115bc29798d')
    brian = User(
        username='Brian_Moore', email='i@aa.io', password='password', first_name='Brian', last_name='Moore', bio='This is about me', profile_image='https://media.comicbook.com/wp-content/uploads/2013/12/brian-griffin-family-guy.jpg')
    eric = User(
        username='cartman', email='eric@aa.io', password='password', first_name='Eric', last_name='Cartman', bio='Most popular 4th grader and not someone you wannna to mess with!', profile_image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTItaeq9DWXYC6K4P4R-uctWoZ2r48Hy-zfIQ&usqp=CAU')
    awesomo = User(
        username='awesomo4000', email='awesomo@aa.io', password='password', first_name='Awesom', last_name='O', bio='Made in Japan', profile_image='https://m.media-amazon.com/images/M/MV5BNjc2OWNiZTktYTJmZS00ZTNkLWEzMjUtODEwMzc1MDFlZDZmXkEyXkFqcGdeQXVyNTM3MDMyMDQ@._V1_.jpg')
    squid = User(
        username='squidman', email='squid@aa.io', password='password', first_name='Squidward', last_name='Tentacles', bio='Clarinet expert and lover of fine dining', profile_image='https://dzevsq2emy08i.cloudfront.net/paperclip/project_image_uploaded_images/16875/carousel/1536182232_open-uri20180905-5748-1y9e30p?1536182232')

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
    db.session.add(eric)
    db.session.add(awesomo)
    db.session.add(tom)
    db.session.add(Jerry)
    db.session.add(huy)
    db.session.add(squid)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table..
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
