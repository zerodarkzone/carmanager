from django.db import models


# Create your models here.
class UserInfo(models.Model):
    """This class represent the user info model."""
    id = models.CharField(max_length=11, blank=False, unique=True, primary_key=True)
    name = models.CharField(max_length=255, blank=False)
    id_image = models.BinaryField(blank=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "id: {}, name: {}".format(self.id, self.name)


class CarInfo(models.Model):
    """This class represent the car info model."""
    owner = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    brand = models.CharField(max_length=255, blank=False)
    model = models.CharField(max_length=255, blank=False)
    year = models.CharField(max_length=4, blank=False)
    plate = models.CharField(max_length=6, blank=False, unique=True, primary_key=True)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "owner_id: {:011}, brand: {}, model: {}: plate: {}"\
            .format(self.owner, self.brand, self.model, self.plate)
