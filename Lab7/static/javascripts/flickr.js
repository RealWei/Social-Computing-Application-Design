(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

(function() {
  rowOutput = '';
  output = [];
  pairs = {};
  //[Lab 7] Fill your Flickr API Key
  APIKey = 'fe7ecb07818d196fd975fd8819b46a49';
  var searchTag = '';
  flickrAPI = '';

  var button = document.getElementById("search-button");
  button.addEventListener("click", function search() {
    $("#photos").empty();
    rowOutput = '';
    flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key='+ APIKey + '&tags='+ searchTag +'&jsoncallback=?';
    getPhotoByTags(flickrAPI);
  });

  $("#search-bar").keyup(function(event){
      if(event.keyCode == 13){
          searchTag = $("#search-bar").val();
          $("#search-button").click();
      }
  });
})();

function getPhotoByTags(api_url) {
    $.getJSON(api_url, function(data) {
        if (data.stat == 'ok') {
            rowOutput = '';
            result = data.photos.photo;
            pairs = {};
            for (var i = 0; i < result.length; i++) {
              var photoData = result[i];
              var photoURL = 'http://farm' + photoData.farm + '.staticflickr.com/' + photoData.server + '/' + photoData.id + '_' + photoData.secret + '.jpg';
              var photoTitle = photoData.title;
              rowOutput += '<a href="' + '#' + '"class="thumbnail col-md-3">' + '<img src ="'+ photoURL + '" onclick="checkLoginState(this);" title="' + photoTitle + '">' + '</a>'
            }
            $("#photos").html(rowOutput);
            $(".jumbotron").hide();
        }
        else {
            result = null;
        }
    });
  }

function postPhotoWithTitleAndURL(photoTitle, photoURL) {
  FB.api('/me/feed', 'post', { message: photoTitle, link : photoURL}, function(response) {
    if (!response || response.error) {
      alert('Error occured');
    } else {
      alert('Post Successed! ID: ' + response.id);
    }
  });
}

function checkLoginState(item) {
  FB.getLoginStatus(function(response) {
    //[Lab 7] Implement this function
    statusChangeCallback(response, item);
  });
}

function statusChangeCallback(response, item) {
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      //[Lab 7] Do something here
      postPhotoWithTitleAndURL(item.title, item.src);
    } else if (response.status === 'not_authorized') {
      alert('Please log ' + 'into this app.');
    } else {
      alert('Please log ' + 'into Facebook.')
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
  }
}

window.fbAsyncInit = function() {
  FB.init({
    //[Lab 7] Fill your App ID
    appId      : '1660672190814399',
    xfbml      : true,
    version    : 'v2.5'
  });
};
