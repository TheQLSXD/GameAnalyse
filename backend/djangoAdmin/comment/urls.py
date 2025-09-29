from django.urls import path
from comment.views import GameAnalysisView

urlpatterns = [
    path('search/', GameAnalysisView.as_view(), name='search'),
    path('analysis/', GameAnalysisView.as_view(), name='game-analysis'),
]