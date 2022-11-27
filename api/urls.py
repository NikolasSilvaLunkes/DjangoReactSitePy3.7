from django.urls import path
from .views import RoomView, CreateRoomView, GetRoom, SubmitComment, CommentView, GetComments,DeleteComment

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('comment', CommentView.as_view()),
    path('submit-comment', SubmitComment.as_view()),
    path('get-comments', GetComments.as_view()),
    path('delete-comment', DeleteComment.as_view())
]