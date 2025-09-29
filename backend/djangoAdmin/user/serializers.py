# users/serializers.py
from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, style={'input_type': 'password'}, label='确认密码')

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        # 验证两次密码是否一致
        if data['password'] != data['password2']:
            raise serializers.ValidationError("两次密码输入不一致")
        return data

    def create(self, validated_data):
        # 移除确认密码字段
        validated_data.pop('password2')

        # 创建用户
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )

        # 为用户创建 Token
        Token.objects.create(user=user)
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'},
        required=True
    )

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            # 使用 Django 的认证系统验证用户
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    data['user'] = user
                else:
                    raise serializers.ValidationError("用户账户已被禁用")
            else:
                raise serializers.ValidationError("用户名或密码错误")
        else:
            raise serializers.ValidationError("必须提供用户名和密码")

        return data