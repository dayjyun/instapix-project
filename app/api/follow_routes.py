from flask import Blueprint
from app.models import Follow, User, db
from flask_login import current_user, login_required

follow_routes = Blueprint('follows', __name__)


# Get all accounts that follow the user
# @follow_routes.route('/users/<user_id>/followers')
# @login_required
# def get_follows_for_user(user_id):
#     user = User.query.get(user_id)
#     follows = Follow.query.filter(Follow.follows_id == user_id).all()
#     if user:
#         if len(follows) == 0:
#             return {'Followers': 0}
#         else:
#             return {'Followers': [follow.to_dict() for follow in follows]}
#     else:
#         return {
#             "message": "User couldn't be found",
#             "statusCode": 404
#            }


# Get all accounts that the user follows
@follow_routes.route('/users/<user_id>/follows')
@login_required
def get_users_follows(user_id):
    user = User.query.get(user_id)
    # follows = Follow.query.filter(Follow.user_id == user_id)\
    #     .join(User, User.username)

    # test = User.query(User).join(Follow, User.id == Follow.user_id)
    # test1 = User.query(User.username).order_by(User.username).all()
    test1 = Follow.query\
        .filter(Follow.user_id == user_id) \
            .join(User)

    # test2 = test1.query(User.username)
    # test1 = User.query \
    #     .join(Follow) \
    #         .filter(Follow.user_id == user_id) \
    #             .all()
    # test1 = Follow.query.filter(Follow.id == user_id).all()

    print('___')
    print(test1)
    print('___')

    return {'Followers': [follow .to_dict()  for follow in test1]}
    # return 'test'
    # if user:
    #     # if len(follows) == 0:
    #     #     return {'Followers': 0}
    #     # else:
    #     # return {'Followers': [follow.to_dict() for follow in follows]}
    #     return 'test'
    # else:
    #     return {
    #         "message": "User couldn't be found",
    #         "statusCode": 404
    #         }
