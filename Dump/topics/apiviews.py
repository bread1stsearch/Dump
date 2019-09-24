from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from topics.models import Topic, Oneliner, Acronym
from topics.serializers import TopicSerializer, OnelinerSerializer, AcronymSerializer

class TopicList(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def get_object(self, pk):
        try:
            return Topic.objects.get(pk=pk)
        except Topic.DoesNotExist:
            print("does not exist")

    def get(self, request):
        topics = Topic.objects.all()
        data = TopicSerializer(topics, many=True).data
        return Response(data)

    def delete(self, request, pk):
        to_delete = self.get_object(pk)
        to_delete.delete()
        return Response("204")



class TopicDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def get(self, request, pk):
        topic = Topic.objects.get(pk=pk)
        topic_data = TopicSerializer(topic).data
        return Response(topic_data)


class OnelinerDetail(generics.ListAPIView):
    queryset = Oneliner.objects.all()
    serializer_class = OnelinerSerializer


class AcronymList(generics.CreateAPIView):
    queryset = Acronym.objects.all()
    serializer_class = AcronymSerializer

    def get_queryset(self):
        topic = self.request.topic
        return Acronym.objects.get()


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


