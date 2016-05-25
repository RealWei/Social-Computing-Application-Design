from django.db import models
from django.contrib.postgres.fields import ArrayField

class User(models.Model):
    id = models.CharField(max_length = 50, primary_key = True)
    name = models.CharField(max_length = 50)
    email = models.CharField(max_length = 50)
    friends = ArrayField(
        models.CharField(max_length = 50)
    , blank = True, null = True)
    liked = ArrayField(
        models.CharField(max_length = 50)
    , blank = True, null = True)
    coins = models.IntegerField(default = 10)

    def ___str___(self):
        return self.name

    def ____unicode____(self):
        return self.name
