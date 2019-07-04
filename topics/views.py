from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.views import generic
from django.shortcuts import render, get_object_or_404

from .models import Topic,Oneliner


# Create your views here
def index(request):
    topic_list = Topic.objects.order_by('topic_text')
    oneliner_list = Oneliner.objects.all()
    context = {
        'topic_list' : topic_list,
        'oneliner_list' : oneliner_list
    }
    return render(request, 'topics/index.html', context)


def topic(request, topic_id):
    topic = get_object_or_404(Topic, pk=topic_id)
    context = {
        'topic': topic
    }
    return render(request, 'topics/topic.html', context)


def oneliner(request, topic_id):
    topic = get_object_or_404(Topic, pk=topic_id)
    context = {
        'oneliner_list' : topic.oneliner_set.all(),
        'topic' : topic
    }
    return render(request, 'topics/oneliner.html', context)


class TopicView(generic.DetailView):
    template_name = "topics/topic.html"
    model = Topic




