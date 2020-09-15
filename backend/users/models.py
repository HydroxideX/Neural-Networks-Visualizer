from django.db import models
from django.contrib.postgres.fields import ArrayField


class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=150)
    is_active = models.BooleanField(default=False)
    charts = ArrayField(base_field=models.IntegerField(default=list))
    is_verified = models.BooleanField(default=False)
    code = models.CharField(max_length=50)

    def __str__(self):
        return self.username + " " + self.email + " " + str(self.is_active) + " " + str(self.password) + " " + str(
            self.is_verified) + " " + str(self.code)
