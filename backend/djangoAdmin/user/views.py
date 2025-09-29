# users/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from .serializers import UserRegisterSerializer, UserLoginSerializer

class RegisterView(generics.CreateAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]  # 允许任何人访问注册

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # 获取用户 Token
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "message": "用户注册成功",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            },
            "token": token.key
        }, status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]  # 允许任何人访问登录

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # 登录用户 (可选，用于会话认证)
        login(request, user)

        # 获取或创建用户 Token
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            "message": "登录成功",
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            },
            "token": token.key
        }, status=status.HTTP_200_OK)


class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]  # 需要认证

    def get(self, request, *args, **kwargs):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_staff": user.is_staff,
            "date_joined": user.date_joined
        })