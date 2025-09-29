# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions, status, exceptions
from rest_framework.permissions import IsAuthenticated  # 添加权限类
from rest_framework.authentication import TokenAuthentication, SessionAuthentication  # 添加认证
from .models import GameReport
from .serializers import GameReportSerializer

class GameAnalysisView(APIView):
    """
    处理 /comment/analysis 的 GET 请求
    示例请求: /comment/analysis?q=搜索内容
    """
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]  # 要求用户登录

    def get(self, request, format=None):
        # 获取查询参数 'q'
        query = request.query_params.get('gameId')

        # 验证参数是否存在
        if not query:
            return Response(
                {"error": "Missing 'gameId' parameter"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 处理查询逻辑（此处为示例）
        analysis_results = self.perform_analysis(query)

        # 返回响应
        return Response({
            "code": 200,
            "query": query,
            "results": analysis_results
        })

    def perform_analysis(self, query):
        """实际分析逻辑（示例）"""
        # 这里替换为你的实际业务逻辑
        return {
            "sentiment": "positive",
            "keywords": [query[:3], query[-3:]],
            "count": len(query)
        }

    def handle_exception(self, exc):
        """自定义异常处理"""
        if isinstance(exc, exceptions.NotAuthenticated):
            return Response(
                {
                    "error": "Authentication required",
                    "detail": "Please provide a valid token or login first",
                    "auth_endpoints": {
                        "token_obtain": "/api-token-auth/",
                        "login_page": "/admin/login/"
                    }
                },
                status=status.HTTP_401_UNAUTHORIZED
            )
        return super().handle_exception(exc)


class GameReportDetail(generics.RetrieveAPIView):
    serializer_class = GameReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # 只返回当前用户创建的报告
        return GameReport.objects.filter(created_by=self.request.user)

    def get_object(self):
        # 确保用户只能访问自己的报告
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj


class GameReportList(generics.ListAPIView):
    serializer_class = GameReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # 返回当前用户的所有报告
        return GameReport.objects.filter(created_by=self.request.user)
