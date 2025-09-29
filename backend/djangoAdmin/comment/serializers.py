from rest_framework import serializers
from .models import GameReport, Topic, AnalysisPerspective, RepresentativeComment
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = RepresentativeComment
        fields = ['content']


class PerspectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalysisPerspective
        fields = ['perspective_type', 'content']


class TopicSerializer(serializers.ModelSerializer):
    perspectives = PerspectiveSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = ['topic_id', 'title', 'core_feedback', 'discussion_scale',
                  'language', 'perspectives', 'comments']


class GameReportSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = GameReport
        fields = ['id', 'title', 'analysis_time', 'analysis_mode', 'topics', 'created_by']