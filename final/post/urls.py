from django.conf.urls import url

from . import views, renderer

urlpatterns = [
    url(r'^home/', renderer.render_home_page),
    url(r'^Post/', renderer.render_post_page),
    url(r'^user/', views.getUser),
    url(r'^vote/', views.vote),
    url(r'^votes/', views.getVotes),
    url(r'^deleteVote', views.deleteVote),
    url(r'^post/', views.create),
    url(r'^stories/', views.getStory),
    url(r'^recommend/', views.recommend)
]
