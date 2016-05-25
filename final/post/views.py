# -*- coding: utf-8 -*-
import json
from random import sample

from django.shortcuts import render
from django import forms
from django.core import serializers
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from post.models import Story, StoryForm, Vote
from post.recommendations import ProductRecommendationProvider
from register.models import User

recommender = ProductRecommendationProvider()

@csrf_exempt
def create(request):
    # return HttpResponseRedirect('http://www.facebook.com')
    if request.method == 'POST':
        form = StoryForm(request.POST, request.FILES)
        if form.is_valid():
            userID = form.cleaned_data['userID']
            user = User.objects.get(id=userID)
            user.coins += 5
            user.save()

            new_story = form.save()
            story = Story.objects.get(pk = new_story.pk)
            story.userName = user.name
            story.save()

            response_data = serializers.serialize('json', [story,])
            return  HttpResponse(response_data, content_type='application/json')
        else:
            print(form.errors)
    form = StoryForm()
    return render(request, 'temp.html', {'form': form})

def getStory(request):
    friends = request.GET.getlist('friends[]')
    stories = Story.objects.filter(userID__in = friends).order_by('id').reverse()
    response_data = serializers.serialize('json', stories)
    struct = json.loads(response_data)
    response_data = json.dumps(struct, ensure_ascii=False)
    response = HttpResponse(response_data, content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, GET'
    response['Access-Control-Max-Age'] = '1000'
    response['Access-Control-Allow-Headers'] = '*'
    response['charset'] = 'utf-8'
    return response

@csrf_exempt
def vote(request):
    if request.method == 'POST':
        storyID = request.POST.get('storyID', '2')
        userFBID = request.POST.get('userFBID', '1')
        score = float(request.POST.get('score', '1'))
        vote = Vote.objects.filter(story_id = storyID, user_id = userFBID)
        story = Story.objects.get(pk = storyID)

        if vote.exists():
            vote = vote[0]

            if vote.score > 0:
                story.likes += 1
                story.dislikes -= 1
            else:
                story.likes -= 1
                story.dislikes += 1
            vote.score = score
            vote.save()
        else:
            if score > 0:
                story.likes += 1
            else:
                story.dislikes += 1
            vote = Vote.objects.create(story_id = storyID, user_id = userFBID, score = score)

        story.save()
        return HttpResponse(status = 201)

    response = HttpResponse(rstatus = 200)
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, GET, DELETE'
    response['Access-Control-Max-Age'] = '1000'
    response['Access-Control-Allow-Headers'] = '*'
    return response

@csrf_exempt
def deleteVote(request):
    storyID = request.POST['storyID']
    userFBID = request.POST['userFBID']
    score = float(request.POST['score'])
    Vote.objects.filter(story_id = storyID, user_id = userFBID).delete()

    story = Story.objects.get(pk = storyID)
    if score > 0:
        story.likes -= 1
    else:
        story.dislikes -= 1
    story.save()
    return HttpResponse(status = 202)

def getVotes(request):
    storyID = request.GET['storyID']
    userFBID = request.GET['userFBID']
    response_data = serializers.serialize('json', Vote.objects.filter(story_id = storyID, user_id = userFBID))
    struct = json.loads(response_data)
    response_data = json.dumps(struct, ensure_ascii = False)
    response = HttpResponse(response_data, content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, GET'
    response['Access-Control-Max-Age'] = '1000'
    response['Access-Control-Allow-Headers'] = '*'
    response['charset'] = 'utf-8'
    return response

def getUser(request):
    userID = request.GET['userFBID']
    response_data = serializers.serialize('json', [User.objects.get(id = userID),])
    struct = json.loads(response_data)
    response_data = json.dumps(struct, ensure_ascii = False)
    response = HttpResponse(response_data, content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, GET'
    response['Access-Control-Max-Age'] = '1000'
    response['Access-Control-Allow-Headers'] = '*'
    response['charset'] = 'utf-8'
    return response

def recommend(request):
    userID = request.GET.get('userFBID', '0')
    user = User.objects.get(id = userID)
    if(user.coins <= 0):
        return HttpResponse(status = 204)
    user.coins -= 1
    user.save()

    # recommender.precompute()
    recommendations = []
    query = list(recommender.storage.get_recommendations_for_user(user = User.objects.get(id = userID)))
    for recommendation in query:
        recommendations.append(recommendation.object)
    if(len(recommendations) < 5):
        count = Story.objects.all().count()
        rand_ids = sample(range(1, count), 5 - len(recommendations))
        stories = list(Story.objects.filter(id__in=rand_ids))
        for story in stories:
            recommendations.append(story)

    serialized_string = serializers.serialize('json', recommendations)
    json_string = json.loads(serialized_string)
    response_data = json.dumps(json_string, ensure_ascii=False)
    response = HttpResponse(response_data, content_type='application/json')
    response['Access-Control-Allow-Origin'] = '*'
    response['Access-Control-Allow-Methods'] = 'POST, GET'
    response['Access-Control-Max-Age'] = '1000'
    response['Access-Control-Allow-Headers'] = '*'
    response['charset'] = 'utf-8'
    return response
