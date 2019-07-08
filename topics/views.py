from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse, HttpResponseRedirect
from django.views import generic
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone

from .models import Topic,Oneliner,Acronym
from .forms import TopicForm

i = 0

# Create your views here
def index(request):
    topic_list = Topic.objects.order_by('topic_text')
    oneliner_list = Oneliner.objects.all()
    context = {
        'topic_list': topic_list,
        'oneliner_list': oneliner_list
    }

    if request.method == 'POST':
        try:
            added_topic = request.POST.get('added_topic')
            new_topic = Topic(topic_text=added_topic, add_date=timezone.now())
            new_topic.save()
            acronym = request.POST.get('acronym')
            if acronym is not None:
                new_topic.acronym = Acronym(acronym_expanded=acronym)
                new_topic.is_acronym = True
                new_topic.acronym.save()
            new_topic.save()
            return HttpResponseRedirect("/topics/{}".format(new_topic.pk))
        except:
            return HttpResponse("No topic added")
    else:
        return render(request, 'topics/index.html', context)

def delete_topic(request, topic_id):
    if request.method == 'POST':
        try:
            to_delete_topic = Topic.objects.get(pk=topic_id)
            print(to_delete_topic)
            to_delete_topic.delete()
            return HttpResponseRedirect("/topics/")
        except:
            return HttpResponse("Error: Topic not deleted")
    else:
        return HttpResponse("delete_topic: what?")

def add_oneliner(request, topic_id):
    if request.method=='POST':
        try:
            print(topic_id)
            added_oneliner = request.POST.get('added_oneliner')
            topic = Topic.objects.get(pk=topic_id)
            print(topic)
            new_oneliner = topic.oneliner_set.create(topic_id=topic.pk,
                                                     text=added_oneliner,
                                                     last_update=timezone.now())
            print(new_oneliner)
            new_oneliner.save()
            return HttpResponseRedirect("/topics/{}".format(topic_id))
        except:
            return HttpResponse("Error: Oneliner not added")
    else:
        return HttpResponse("add_oneliner: what?")


def delete_oneliner(request, oneliner_id):
    if request.method == 'POST':
        try:
            to_delete_oneliner = Oneliner.objects.get(pk=oneliner_id)
            topic_id = to_delete_oneliner.topic_id
            print(to_delete_oneliner)
            to_delete_oneliner.delete()
            return HttpResponseRedirect("/topics/{}".format(topic_id))
        except:
            return HttpResponse("Error: Topic not deleted")
    else:
        return HttpResponse("delete_topic: what?")


def topic(request, topic_id):
    topic = get_object_or_404(Topic, pk=topic_id)
    context = {
        'topic': topic
    }
    return render(request, 'topics/topic.html', context)


def oneliner(request, topic_id):
    topic = get_object_or_404(Topic, pk=topic_id)
    context = {
        'oneliner_list': topic.oneliner_set.all(),
        'topic': topic
    }
    return render(request, 'topics/oneliner.html', context)


class TopicView(generic.DetailView):
    template_name = "topics/topic.html"
    model = Topic







