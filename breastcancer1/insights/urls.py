from django.urls import path


from . import views

urlpatterns = [
    path('corrcoef/', views.corrcoef, name='corrcoef')
]