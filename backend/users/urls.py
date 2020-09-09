from django.urls import path

from . import views


app_name = 'users'
urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('<str:username>/', views.get_user_data, name='get_user_data'),
]
