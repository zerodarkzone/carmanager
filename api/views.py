import csv
from io import StringIO
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, filters
from rest_framework.views import Response
from rest_framework.views import APIView
from django.db.models import Count
from .serializers import UserInfoSerializer
from .serializers import CarInfoSerializer
from .models import UserInfo
from .models import CarInfo


# Create your views here.
class CreateUserView(generics.ListCreateAPIView):
    """This class defines the create behavior of our resrt api."""

    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new entry."""
        serializer.save()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        for el in data:
            el.pop('id_image', None)

        return Response(data)


class UserDetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests for the user database."""
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer


class CreateCarView(generics.ListCreateAPIView):
    """This class defines the create behavior of our rest api."""

    queryset = CarInfo.objects.all()
    serializer_class = CarInfoSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new entry."""
        serializer.save()


class CarCsvView(generics.GenericAPIView):
    queryset = CarInfo.objects.all()
    serializer_class = CarInfoSerializer

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        data = serializer.data

        out = StringIO()
        output = csv.writer(out)
        output.writerow(data[0].keys())
        for row in data:
            output.writerow(row.values())
        return Response({"csv": out.getvalue()})


class CarDetailsView(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests for the car database."""
    queryset = CarInfo.objects.all()
    serializer_class = CarInfoSerializer


class CountCarsPerBrand(generics.GenericAPIView):
    """This class handles the http GET, PUT and DELETE requests."""
    queryset = CarInfo.objects.values('brand')

    def get(self, request, *args, **kwargs):
        """Return the number of cars per brand."""
        brands = self.get_queryset().annotate(Count('brand')).order_by()
        return Response(brands)


class GetCarsPerBrand(generics.GenericAPIView):
    queryset = CarInfo.objects.all()
    serializer_class = CarInfoSerializer

    def get(self, request, *args, **kwargs):
        """Return every car per brand."""
        brands = [value['brand'] for value in self.get_queryset().values('brand').distinct()]
        cars = {value: self.get_serializer(self.get_queryset().filter(brand=value), many=True).data for value in brands}
        for key, value in cars.items():
            for car in value:
                car.pop("brand", None)
        return Response(cars)


class CarListView(generics.ListAPIView):
    queryset = CarInfo.objects.all()
    serializer_class = CarInfoSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('brand', 'model', 'plate', 'year', 'owner__id', 'owner__name')


class UserListView(generics.ListAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('id', 'name')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        for el in data:
            el.pop('id_image', None)

        return Response(data)
