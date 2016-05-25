from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from django.utils.encoding import python_2_unicode_compatible
from recommends.providers import RecommendationProvider
from recommends.providers import recommendation_registry

from .models import Story, Vote
from register.models import User

class ProductRecommendationProvider(RecommendationProvider):
    def get_users(self):
        return User.objects.filter(votes__isnull=False).distinct()

    def get_items(self):
        return Story.objects.all()

    def get_ratings(self, obj):
        return Vote.objects.filter(story = obj)

    def get_rating_score(self, rating):
        return rating.score

    def get_rating_user(self, rating):
        return rating.user

    def get_rating_item(self, rating):
        return rating.product

recommendation_registry.register(Vote, [Story], ProductRecommendationProvider)
