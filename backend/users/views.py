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


def get_user_data(request):
    return None


def signup_view(request):
    return None


@api_view(['POST'])
def login_view(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response(True)
    else:
        return Response(False)


@api_view(['POST'])
def logout_view(request):
    logout(request)


@api_view(['GET'])
def index(request):
    return None