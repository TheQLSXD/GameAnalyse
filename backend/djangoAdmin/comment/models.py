from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class GameReport(models.Model):
    title = models.CharField(max_length=200)
    analysis_time = models.DateTimeField()
    analysis_mode = models.CharField(max_length=100)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

class Topic(models.Model):
    report = models.ForeignKey(GameReport, related_name='topics', on_delete=models.CASCADE)
    topic_id = models.IntegerField()
    title = models.CharField(max_length=200)
    core_feedback = models.TextField()
    discussion_scale = models.CharField(max_length=100)
    language = models.CharField(max_length=50)

class AnalysisPerspective(models.Model):
    PERSPECTIVE_CHOICES = [
        ('community', '社区运营'),
        ('design', '游戏设计'),
        ('development', '技术开发'),
        ('product', '产品决策'),
    ]
    topic = models.ForeignKey(Topic, related_name='perspectives', on_delete=models.CASCADE)
    perspective_type = models.CharField(max_length=20, choices=PERSPECTIVE_CHOICES)
    content = models.JSONField()

class RepresentativeComment(models.Model):
    topic = models.ForeignKey(Topic, related_name='comments', on_delete=models.CASCADE)
    content = models.TextField()