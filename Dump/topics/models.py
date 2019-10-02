from django.db import models
from django.utils import timezone
import datetime
from django.urls import reverse

# Create your models here.
class Topic(models.Model):
    topic_text = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    is_acronym = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse('topic', kwargs={'pk': self.pk})

    def setup(self, topic_text="default topic title"):
        self.topic_text = topic_text
        self.created = timezone.now()

    def was_added_recently(self):
        return self.created >= timezone.now() - datetime.timedelta(days=7)

    def __str__(self):
        return self.topic_text


class Acronym(models.Model):
    topic = models.OneToOneField(Topic, on_delete=models.CASCADE, null=True)
    acronym_expanded = models.CharField(max_length=500)

    def __str__(self):
        return "{} - {}".format(self.topic.topic_text, self.acronym_expanded)


class Oneliner(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    last_update = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Oneliner for topic {}: {}".format(self.topic.topic_text, self.text)


class Steps(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    num_steps = models.IntegerField()

    def __str__(self):
        return self.num_steps


class Resource(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    text = models.CharField(max_length=5000)

    def __str__(self):
        return self.text
