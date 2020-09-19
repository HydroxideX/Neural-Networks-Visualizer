from django.urls import path

from . import views


app_name = 'users'
urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('verify_email/', views.verify_email, name='verify'),
    path('get_charts/', views.get_user_charts_view, name='get_user_charts'),
    path('save_chart/', views.save_chart_view, name='get_user_charts'),
    path('get_chart/', views.get_chart_view, name='get_user_charts'),
]
