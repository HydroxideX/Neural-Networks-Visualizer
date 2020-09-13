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
from django.core.mail import send_mail
from django.core.mail import EmailMessage
import random


def get_user_data(request):
    return None


def code_generator():
    n = random.randint(1111111, 9999999)
    return n


@api_view(['POST'])
def verify_email(request):
    oldLen = len(User.objects.all())
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    newLen = len(User.objects.all())
    if newLen == oldLen:
        return Response("false")
    else:
        return Response("true")


@api_view(['POST'])
def register_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        created_object = request.data
        code = code_generator()
        email = EmailMessage('Neural Network Visualizer Verification Email',
                             'Thank you for signing up ' + created_object[
                                 'username'] + ',\n\n please enter this code ' + str(code), to=[created_object['email']])
        email.send()
        print(code)
        return Response(str(code))
    else:
        return Response("false")


def get_user(request):
    email = request.data['email']
    password = request.data['password']
    user = User.objects.filter(email=email, password=password)
    return user


@api_view(['POST'])
def login_view(request):
    user = get_user(request)
    if len(user) != 0:
        curr = user.first()
        curr.is_active = True
        curr.save()
        return Response(user.first().username)
    else:
        return Response("false")


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
