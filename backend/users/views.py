from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from django.core.mail import EmailMessage
import random


def get_user_data(request):
    return None


def code_generator():
    n = random.randint(1111111, 9999999)
    return n


@api_view(['POST'])
def verify_email(request, code):
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
    oldLen = len(User.objects.all())
    code = code_generator()
    serializer = UserSerializer(data=request.data, code=code, is_verified=False)
    if serializer.is_valid():   
        serializer.save()
    newLen = len(User.objects.all())
    if newLen == oldLen:
        return Response("false")
    else:
        created_object = request.data
        email = EmailMessage('Neural Network Visualizer Verification Email',
                             'Thank you for signing up ' + created_object[
                                 'username'] + ',\n\n please use this link to verify your email address \n' +
                              str(code))
        email.send()
        return Response("true")


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
