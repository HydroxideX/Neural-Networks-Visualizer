from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ChartSerializer
from .models import Chart


def find_chart(request):
    chart = Chart.objects.filter(email= request.data['email'], chart_name=request.data['chart_name'] , password=request.data['password'])
    return chart


def is_in_database(request):
    chart = find_chart(request)
    return len(chart) == 0


@api_view(['GET'])
def get_chart(request):
    return Response(find_chart(request.data).First())


@api_view(['POST'])
def save_chart(request):
    if is_in_database(request):
        return Response(False)
    serializer = ChartSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data.get(id))


@api_view(['POST'])
def update_chart(request):
    chart = find_chart(request)
    currChart = chart.First()
    currChart.images = request.data['images']
    currChart.save()
    return
