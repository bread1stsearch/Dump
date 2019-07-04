from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<int:pk>/', views.TopicView.as_view(), name="topic"),
    path('<int:topic_id>/oneliner', views.oneliner, name="oneliner")
]