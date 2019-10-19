from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from topics.models import Topic, Oneliner, Acronym
from rest_framework.response import Response
from django.db import models
from django.utils import timezone


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
    topic_text = serializers.CharField(max_length=200)
    is_acronym = serializers.BooleanField(default=False)
    oneliner_set = OnelinerSerializer(many=True, required=False, allow_null=True)
    acronym = AcronymSerializer(many=False, required=False, allow_null=True)

    class Meta:
        model = Topic
        fields = ['id', 'topic_text', 'is_acronym', 'oneliner_set', 'acronym']
        depth = 1

    def to_internal_value(self, data):
        internal_value = super(TopicSerializer, self).to_internal_value(data)

        internal_value.update({
            "acronym_expanded": data.get("acronym_expanded")
        })

        return internal_value

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        # acronym_expanded = validated_data.pop('acronym_expanded')
        # oneliners = validated_data.pop('oneliner_set')
        # topic = Topic.objects.create(**validated_data)
        # for o in oneliners:
        #     topic = Topic.objects.get(pk=topic.pk)
        #     topic.oneliner_set.create(topic_id=topic.pk,
        #                                         text=o,
        #                                         last_update=timezone.now())
        # Acronym.objects.create(topic=topic, acronym_expanded=acronym_expanded)

        topic = Topic.objects.create(**validated_data)

        if topic.is_acronym:
            acronym_expanded = validated_data.pop('acronym_expanded')
            Acronym.objects.create(topic=topic, acronym_expanded=acronym_expanded)

        return topic

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.topic_text = validated_data.get('topic_text', instance.topic_text)
        instance.is_acronym = validated_data.get('is_acronym', instance.is_acronym)
        instance.save()
        return instance
