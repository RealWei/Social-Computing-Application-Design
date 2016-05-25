function getData(){
    var output = '';
    var APIKey = 'fe7ecb07818d196fd975fd8819b46a49';
    var tag = document.getElementById("tagInput").value;
    var flickrAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key='+ APIKey + '&tags=' + tag +'&jsoncallback=?';

    $.getJSON(flickrAPI, function(data) {
        if (data.stat == 'ok') {
            result = data.photos.photo;
            for (var i = 0; i < result.length; i++) {
                url = "http://farm" + result[i].farm + ".staticflickr.com/" + result[i].server + "/" +
                 result[i].id + "_" + result[i].secret + ".jpg";
                output += "<img src=\"" + url + "\"></img>";
            }
            document.getElementById("list").innerHTML = output;
        }
        else {
            result = null;
        }
    });
}
