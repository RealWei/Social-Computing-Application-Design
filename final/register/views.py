from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import User

@csrf_exempt
def register(request):
    if request.method == 'POST':
        fbID = request.POST['fbID']
        name = request.POST['name']
        email = request.POST.get('email', '')
        friends = request.POST.getlist('friends')
        user = User.objects.create(id=fbID, name=name, email=email, friends=friends)
    return HttpResponse(status = 201)

def getUser(request):
    usedID = request.GET['userFBID']
    user = User.objects.filter(id=userID)
