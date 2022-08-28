from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Comment

def body_exists(form, field):
    if not field.data:
        raise ValidationError('Body is required')


class CommentForm(FlaskForm):
    body = StringField('Body', validators=[DataRequired(), body_exists])
    submit = SubmitField('Submit')
