from django import forms

class TopicForm(forms.Form):
    topic_text = forms.CharField(label="added_topic", max_length=500)