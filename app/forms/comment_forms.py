from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

def body_exists(form, field):
    if not field.data:
        raise ValidationError('Body is required')


class CreateCommentForm(FlaskForm):
    user_id = IntegerField('user id', validators=[DataRequired()])
    post_id = IntegerField('post id', validators=[DataRequired()])
    body = StringField('Body', validators=[body_exists])
    submit = SubmitField('Submit')

class EditCommentForm(FlaskForm):
    body = StringField('Body', validators=[DataRequired(), body_exists])
    submit = SubmitField('Submit')
