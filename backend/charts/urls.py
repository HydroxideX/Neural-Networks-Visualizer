from django.urls import path

from . import views


app_name = 'users'
urlpatterns = [
    path('<str:name>/', views.get_chart, name='get_chart'),
    path('save/', views.save_chart, name='save_chart'),
    path('update/', views.update_chart, name='update_chart'),
]
