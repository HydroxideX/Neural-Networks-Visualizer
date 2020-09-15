from rest_framework import serializers
from .models import Chart
from django.contrib.auth.hashers import make_password


class ChartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chart
        fields = '__all__'
