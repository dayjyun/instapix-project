from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User

me_routes = Blueprint('me', __name__, url_prefix='/me')

@me_routes.route('/')
@login_required
def get_me():
    c_user = User.query.get(current_user.get_id())
    return c_user.to_dict()
