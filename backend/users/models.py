from django.db import models


class User(models.Model):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)
    is_active = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    code = models.CharField(max_length=50)

    def __str__(self):
        return self.username + " " + self.email + " " + str(self.is_active) + " " + str(self.password) + " " + str(
            self.is_verified) + " " + str(self.code)
