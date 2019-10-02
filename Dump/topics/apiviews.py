from rest_framework import generics, status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from topics.models import Topic, Oneliner, Acronym
from topics.serializers import TopicSerializer, OnelinerSerializer, AcronymSerializer
from django.http import JsonResponse

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

    def post(self, request):
        data = JSONParser().parse(request)

        serializer = TopicSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
        # acronym = None
        # if acronym is not None:
        #     if topic.is_valid() and acronym.is_valid():
        #         topic.save()
        #         acronym.save()
        #         return Response("200")
        #     elif not topic.is_valid():
        #         return Response(topic.errors, status=status.HTTP_400_BAD_REQUEST)
        #     elif not acronym.is_valid():
        #         return Response(acronym.errors, status=status.HTTP_400_BAD_REQUEST)
        # else:
        #     if topic.is_valid():
        #         topic.save()
        #         return Response("200")
        #     else:
        #         return Response(topic.errors, status=status.HTTP_400_BAD_REQUEST)


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


