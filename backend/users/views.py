from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.views import generic
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login, logout
from .models import User


def get_user_data(request):
    return None


@api_view(['POST'])
def register_view(request):
    oldLen = len(User.objects.all())
    serializer = UserSerializer(data=request.data)
    newLen = len(User.objects.all())
    if serializer.is_valid():
        serializer.save()
    if newLen == oldLen:
        return Response(False)
    else:
        return Response(True)


def get_user(request):
    username = request.data['email']
    password = request.data['password']
    user = User.objects.filter(username=username, password=password)
    return user


@api_view(['POST'])
def login_view(request):
    user = get_user(request)
    if len(user) != 0:
        curr = user.get(pk=1)
        curr.is_active = True
        curr.save()
        return Response(True)
    else:
        return Response(False)


@api_view(['POST'])
def logout_view(request):
    user = get_user(request)
    if len(user) != 0:
        curr = user.get(pk=1)
        curr.is_active = False
        curr.save()
        return Response(True)
    else:
        return Response(False)


@api_view(['GET'])
def index(request):
    return None