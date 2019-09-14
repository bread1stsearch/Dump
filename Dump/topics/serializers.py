from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from topics.models import Topic, Oneliner, Acronym
from rest_framework.response import Response
from django.db import models

# NOTE: Nested Serialization
# https://stackoverflow.com/questions/29651945/django-rest-framework-nested-serializer-not-showing-related-data/29652574

class OnelinerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Oneliner
        fields = ['topic', 'text']


class AcronymSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acronym
        fields = ['topic', 'acronym_expanded']


class TopicSerializer(serializers.ModelSerializer):
    # if many to one relationship,
    # <fieldname>_set references list of objects with foreign key to topic
    oneliner_set = OnelinerSerializer(many=True, read_only=True)
    acronym = AcronymSerializer(many=False, read_only=True)

    class Meta:
        model = Topic
        fields = ['id', 'topic_text', 'is_acronym', 'oneliner_set', 'acronym']
        depth = 1

