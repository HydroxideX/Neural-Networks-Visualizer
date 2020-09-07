from django.urls import path

from . import views


app_name = 'users'
urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('<str:username>/', views.get_user_data, name='get_user_data'),
]
