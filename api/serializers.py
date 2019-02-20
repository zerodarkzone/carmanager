import base64
from rest_framework import serializers
from .models import UserInfo
from .models import CarInfo


class BinaryField(serializers.Field):
    def to_representation(self, value):
        return base64.b64encode(value)

    def to_internal_value(self, data):
        return base64.b64decode(data)


class UserInfoSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance to JSON format."""
    id_image = BinaryField()

    class Meta:
        model = UserInfo
        fields = ('id', 'name', 'id_image', 'date_created', 'date_modified')
        read_only_fields = ('date_created', 'date_modified')


class CarInfoSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance to JSON format."""

    owner = serializers.PrimaryKeyRelatedField(queryset=UserInfo.objects.all())

    class Meta:
        """Meta class to map the serializer's fields with the model fields."""
        model = CarInfo
        fields = ('owner', 'brand', 'model', 'year', 'plate', 'date_created', 'date_modified')
        read_only_fields = ('date_created', 'date_modified')
