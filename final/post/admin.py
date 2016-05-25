from django.contrib import admin
from .models import Story, Vote

class StoryAdmin(admin.ModelAdmin):
    readonly_fields = ('created_time',)

admin.site.register(Story, StoryAdmin)
admin.site.register(Vote)
