from django.db import models
from django.utils import timezone
import datetime
#from django.contrib.auth.models import User


class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    email = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.username + " " + self.email + " " + str(self.is_active)
