from django.shortcuts import render

def render_home_page(request):
    return render(request, 'MainPage.html')

def render_post_page(request):
    return render(request, 'PostPage.html')
