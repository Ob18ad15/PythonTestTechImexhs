from django.db import models

class Device(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
class ImageResult(models.Model):
    image_result_id = models.CharField(max_length=100)
    device = models.ForeignKey(Device, on_delete=models.CASCADE)
    data= models.JSONField()
    data_size = models.IntegerField()
    average_before = models.FloatField()
    average_after = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


