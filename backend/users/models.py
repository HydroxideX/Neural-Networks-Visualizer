from django.db import models
from django.utils import timezone
import datetime
#from django.contrib.auth.models import User


class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
