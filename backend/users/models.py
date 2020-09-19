from django.db import models
from django.contrib.postgres.fields import JSONField


class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=150)
    is_active = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    code = models.CharField(max_length=50)
    drawings = models.JSONField(default=dict)

    def __str__(self):
        return self.username + " " + self.email + " " + str(self.is_active) + " " + str(self.password) + \
               " " + str(self.is_verified) + " " + str(self.code) + " " + str(self.drawings)
