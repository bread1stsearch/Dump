from django.db import models
from django.utils import timezone
import datetime


# Create your models here.
class Topic(models.Model):
    topic_text = models.CharField(max_length=200)
    add_date = models.DateTimeField('date added')
    is_acronym = models.BooleanField(default=False)

    def was_added_recently(self):
        return self.add_date >= timezone.now() - datetime.timedelta(days=7)

    def __str__(self):
        return self.topic_text


class Acronym(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    acronym_expanded = models.CharField(max_length=500)

    def __str__(self):
        return "{} - {}".format(self.topic, self.acronym_expanded)


class Oneliner(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    last_update = models.DateTimeField('last updated')

    def __str__(self):
        return "Oneliner for topic {}: {}".format(self.topic.topic_text, self.text)


class Steps(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    num_steps = models.IntegerField()

    def __str__(self):
        return self.num_steps
