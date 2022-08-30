from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError


class HashtagForm(FlaskForm):
    hashtag = StringField('Hashtag', validators=[DataRequired()])
    submit = SubmitField('Submit')
