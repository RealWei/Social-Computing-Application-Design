# -*- coding: utf-8 -*-
from django.db import models
from django import forms
from django.contrib.postgres.fields import ArrayField
from django.contrib.sites.models import Site
from django.utils.translation import ugettext_lazy as _

from register.models import User

MEALS_CHOICES = [('早餐','早餐'),
                 ('早午餐', '早午餐'),
                 ('午餐', '午餐'),
                 ('下午茶', '下午茶'),
                 ('晚餐', '晚餐'),
                 ('宵夜', '宵夜')]

STYLE_CHOICES = [('台式', '台式'),
                ('中式', '中式'),
                ('西式', '西式'),
                ('泰式', '泰式'),
                ('義式', '義式'),
                ('日式', '日式'),
                ('韓式', '韓式'),
                ('法式', '法式'),
                ('越南', '越南'),
                ('印度', '印度'),
                ('其它', '其它')]

class Story(models.Model):
    userID = models.CharField(max_length = 50)
    userName = models.CharField(max_length = 50, blank = True, default = '')
    shopName = models.CharField(max_length = 50)
    foodName = models.CharField(max_length = 50)
    meal = models.CharField(max_length = 10, choices = MEALS_CHOICES)
    type = models.CharField(max_length = 10, choices = STYLE_CHOICES)
    address = models.CharField(max_length = 50)
    photo = models.ImageField(upload_to = 'photos/')
    message = models.CharField(max_length = 100)
    likes = models.IntegerField(default = 0)
    dislikes = models.IntegerField(default = 0)
    created_time = models.DateTimeField(auto_now_add = True)

    def ____str____(self):
        return self.foodName

    def ____unicode____(self):
        return self.foodName

    @models.permalink
    def get_absolute_url(self):
        return ('post_detail', [self.id])

class StoryForm(forms.ModelForm):
    class Meta:
        model = Story
        fields = ['userID', 'shopName', 'foodName', 'type', 'meal', 'address', 'message', 'photo']
        labels = {
            'shopName': _('店名'),
            'foodName': _('菜名'),
            'type': _('種類'),
            'address': _('地址'),
            'message': _('心得'),
            'photo': _('照片')
        }

class Vote(models.Model):
    user = models.ForeignKey(User, related_name='vote')
    story = models.ForeignKey(Story)
    score = models.FloatField()

    def __str__(self):
        return "Vote"
