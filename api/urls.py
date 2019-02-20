from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreateUserView
from .views import CreateCarView
from .views import UserDetailsView
from .views import CarDetailsView
from .views import CountCarsPerBrand
from .views import GetCarsPerBrand
from .views import CarCsvView
from .views import UserListView
from .views import CarListView

urlpatterns = [
    path('api/create_user/', CreateUserView.as_view(), name='create_user'),
    path('api/add_car/', CreateCarView.as_view(), name='add_car'),
    path('api/cvs_car/', CarCsvView.as_view(), name='cvs_car'),
    path('api/modify_user/<int:pk>/', UserDetailsView.as_view(), name='user'),
    path('api/modify_car/<str:pk>/', CarDetailsView.as_view(), name='plate'),
    path('api/count_cars/', CountCarsPerBrand.as_view(), name='count'),
    path('api/get_cars/', GetCarsPerBrand.as_view(), name='cars'),
    path('api/list_users/', UserListView.as_view(), name='list_users'),
    path('api/list_cars/', CarListView.as_view(), name='list_cars')
]

urlpatterns = format_suffix_patterns(urlpatterns)
