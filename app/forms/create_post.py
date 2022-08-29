from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class CreatePostForm(FlaskForm):
    caption = StringField(validators=[DataRequired()])
    image_url = StringField(validators=[DataRequired()])
    submit = SubmitField()
