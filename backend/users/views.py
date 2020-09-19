import string
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from django.core.mail import EmailMessage
import random


def code_is_not_unique(result_str):
    user = User.objects.filter(code=result_str)
    if len(user) == 0:
        return False
    return True


def code_generator():
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(15))
    while code_is_not_unique(result_str):
        letters = string.ascii_lowercase
        result_str = ''.join(random.choice(letters) for i in range(15))
    return result_str


@api_view(['POST'])
def verify_email(request):
    code = request.data['code']
    user = User.objects.filter(code=code)
    if len(user) != 0:
        if code == user.first().code:
            curr = user.first()
            curr.is_verified = True
            curr.save()
            return Response("true")
    return Response("false")


@api_view(['POST'])
def register_view(request):
    old_len = len(User.objects.all())
    code = code_generator()
    request.data['code'] = str(code)
    serializer = UserSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
    new_len = len(User.objects.all())
    if new_len == old_len:
        return Response("false")
    else:
        print("here")
        created_object = request.data
        email = EmailMessage('Neural Network Visualizer Verification Email',
                             'Thank you for signing up ' + created_object[
                                 'username'] + ',\n\n please use this link to verify your email address \n' +
                             str(code), to=[created_object['email']])
        email.send()
        print("here")
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
        curr =  user.first()
        curr.is_active = False
        curr.save()
        return Response(True)
    else:
        return Response(False)


@api_view(['GET'])
def get_user_charts_view(request):
    user = get_user(request)
    curr = user.first()
    return curr.drawings


@api_view(['GET'])
def get_chart_view(request):
    user = get_user(request)
    curr = user.first()
    return curr.drawings[request.data["chart_name"]]


@api_view(['POST'])
def save_chart_view(request):
    user = get_user(request)
    if len(user) != 0:
        curr = user.first()
        chart = request.data["chart"]
        curr.drawings[chart["name"]] = chart["drawing"]
        curr.save()
        return Response(True)
    else:
        return Response(False)
