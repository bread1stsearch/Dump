from django.urls import path
from topics.apiviews import TopicList, TopicDetail, OnelinerDetail, TopicViewSet
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('', TopicViewSet, base_name="topics")

urlpatterns = [
    # path('', views.index, name='index'),
    # path('<int:pk>/', views.TopicView.as_view(), name="topic"),
    path('<int:topic_id>/oneliner/', views.oneliner, name="oneliner"),
    path('delete/<int:topic_id>', views.delete_topic, name="delete_topic"),
    path('<int:topic_id>/addoneliner/', views.add_oneliner, name="add_oneliner"),
    path('deleteoneliner/<int:oneliner_id>', views.delete_oneliner, name="delete_oneliner"),
    path('serialize/', TopicList.as_view(), name="topics_list"),
    path('serialize/<int:pk>/', TopicDetail.as_view(), name="topics_detail")
]

urlpatterns += router.urls