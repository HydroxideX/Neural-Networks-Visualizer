from django.db import models


class Chart(models.Model):
    chart_name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=150)
    images = models.JSONField()
    
    def __str__(self):
        return self.name + str(self.pieces)

    def get_name(self):
        return self.name
