from app.models.post import db, Post


# Adds a demo user, you can add other users here if you want
def seed_posts():
    post1 = Post(
        user_id=1, caption='my first instapix post! #tbh', post_url='https://www.dumpaday.com/wp-content/uploads/2019/12/pictures-10-2.jpg')
    post2 = Post(
        user_id=2, caption='went to the local cafe for a coffee. Yum! #omg', post_url='https://www.dumpaday.com/wp-content/uploads/2017/03/random-pictures-30-2.jpg')
    post3 = Post(
        user_id=3, caption='my dog sleeping--how cute is he? #instapix', post_url='https://www.dumpaday.com/wp-content/uploads/2017/03/random-pictures-33-2.jpg')
    post4 = Post(
        user_id=4, caption='happy hour with the family!', post_url='https://i.pinimg.com/originals/f0/0d/ae/f00dae40fa38727e2ab1eaa4760f2e6c.jpg')
    post5 = Post(
        user_id=1, caption='my second instapix post! #tbh', post_url='https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706__340.jpg')
    post6 = Post(
        user_id=2, caption='went to the local cafe for a coffee, again! Yum! #omg', post_url='https://i0.wp.com/www.teamjimmyjoe.com/wp-content/uploads/2016/08/funny-dog-duck-lips.jpg?resize=600%2C600')
    post7 = Post(
        user_id=3, caption='my dog sleeping--he\'s really lazy? #instapix', post_url='https://images3.memedroid.com/images/UPLOADED96/5dff7350eefc0.jpeg')
    post8 = Post(
        user_id=4, caption="Life is better when you're laughing.", post_url='https://autofish.net/mirrors/images/animals/cats/cat_corner.jpg')
    post9 = Post(
        user_id=5, caption="With great girlfriend comes great expenses.", post_url='https://bluefaqs.com/wp-content/uploads/2010/06/Up.jpg')
    post10 = Post(
        user_id=1, caption="People say 'go big or go home' like going home is a bad thing. Heck yeah, I want to go home, and I'll have a nap when I get there.", post_url='https://images4.fanpop.com/image/photos/21300000/wallpaper-random-21343049-1280-800.jpg')
    post11 = Post(
        user_id=2, caption="Don't talk to me until I've had my morning coffee.", post_url='https://i.pinimg.com/736x/ed/36/8f/ed368fce6a450f3b81d836eb564d88a7.jpg')
    post12 = Post(
        user_id=3, caption="Catch flights, not feelings.", post_url='https://i.ytimg.com/vi/WJZIJ4XSQ-Q/maxresdefault.jpg')
    post13 = Post(
        user_id=4, caption='I am the worst thing ever happen to you if you poked me badly.', post_url='https://getwallpapers.com/wallpaper/full/c/0/0/733257-random-funny-wallpapers-1920x1200-720p.jpg')
    post14 = Post(
        user_id=5, caption='Heaven in her eyes, hell behind mine.', post_url='https://www.pixelstalk.net/wp-content/uploads/2016/08/Impressive-Random-Wallpaper.jpg')
    post15 = Post(
        user_id=1, caption='No man can be wise on an empty stomach.', post_url='https://images2.fanpop.com/images/photos/4600000/Nature-random-4633436-1280-800.jpg')
    post16 = Post(
        user_id=2, caption='Looking like your neighborhood soccer mom. #felipeSilva916', post_url='https://images5.fanpop.com/image/photos/31600000/Cool-Wallpaper-random-31687536-1920-1200.jpg')
    post17 = Post(
        user_id=3, caption="I know looks aren't everything, but I have them just in case.", post_url='https://getwallpapers.com/wallpaper/full/4/6/5/733314-random-funny-wallpapers-2048x1536-smartphone.jpg')
    post18 = Post(
        user_id=4, caption="Doing nothing is hard, you never know when you're done.", post_url='https://1.bp.blogspot.com/_EAViqbzwc_s/TJ3wMeIOSZI/AAAAAAAABNM/0U9mcf2AYeA/s1600/Random%2Bwallpapers%2B(6).jpg')
    post19 = Post(
        user_id=5, caption='This is the most magical pic of your life.', post_url='https://1.bp.blogspot.com/-Xso1CCZ-iGI/Vs34mYqxnVI/AAAAAAAEVm4/xIhgP5vUbW4/s1600/Random%2Bhumor%2B00409.jpg')

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)
    db.session.add(post13)
    db.session.add(post14)
    db.session.add(post15)
    db.session.add(post16)
    db.session.add(post17)
    db.session.add(post18)
    db.session.add(post19)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
