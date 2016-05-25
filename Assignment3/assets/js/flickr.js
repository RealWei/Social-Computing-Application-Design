$(document).ready(function() {
    // To detect enter event in search field.
    $('#tag-input').keypress(function(event) {
        if(event.keyCode == 13){
            searchByInput();
        }
    });
});

// This function is called by search field.
function searchByInput(){
    var tag = document.getElementById('tag-input').value;
    console.log(tag);
    getData(tag);
}


// This function is called by click on tags.
function searchByTag(tag){
    tag = "" + tag;
    tag = tag.split("#");
    tag = tag[1];
    document.getElementById('tag-input').value = tag;
    getData(tag);
}

// This function is used to get photos with tag.
// param: tag : the tag to be searched on Flickr.
function getData(tag){
    var output = '';
    var APIKey = 'fe7ecb07818d196fd975fd8819b46a49';
    var searchAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key='+ APIKey + '&tags=' + tag +'&jsoncallback=?';
    var photoInfoAPI = 'https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&format=json&api_key='+ APIKey + '&photo_id=';
    var photoSize, loaded;
    var result;


    // Clear photos before searching.
    $('#photo-list').empty();

    $.getJSON(searchAPI, function(data) {
        if (data.stat == 'ok') {
            result = data.photos.photo;
            console.log(data);
            // Wait a while and scroll page down.
            setTimeout(function(){
                $('html,body').animate({scrollTop: 500}, 1000);
            }, 500);

            // Get detail information for each photo.
            for (var i = 0; i < result.length; i++) {
                var photoInfoUrl = photoInfoAPI + result[i].id + '&jsoncallback=?';
                $.getJSON(photoInfoUrl, createCard(i));
            }
        }
        else {
            result = null;
        }
    });
}


// Generate a card contains photo, then append to photo-list.
function createCard(id){
    return function(res){
        if(res.stat == 'ok'){
            info = res.photo;
            var url = "http://farm" + info.farm + ".staticflickr.com/" + info.server + "/" + info.id + "_" + info.secret + ".jpg";
            var card = "";
            card += "<div class=\"card\" id=\"" + id + "\" style=\"opacity:0.0\">";
            card += "            <div class=\"card-image waves-effect waves-block waves-light\">";
            card += "              <img class=\"activator card-img\" src=\"" + url + "\">";
            card += "            <\/div>";
            card += "            <div class=\"card-content\">";
            card += "              <span class=\"card-title activator grey-text text-darken-4\">" + info.title._content + "<i class=\"material-icons right\">more_vert<\/i><\/span>";
            card += "              <p><a href=\"" + info.urls.url[0]._content + "\" target=\"_blank\"><i class=\"material-icons right\">arrow_forward</i><\/a><\/p>";
            card += "            <\/div>";
            card += "            <div class=\"card-reveal\">";
            card += "              <span class=\"card-title grey-text text-darken-4\">" + info.title._content + "<i class=\"material-icons right\">close<\/i><\/span>";
            card += "              <p>" + info.description._content + "<\/p>";
            card += "              <p>" + getTags(info.tags) + "<\/p>" ;
            card += "            <\/div>";
            card += "      <\/div>";
            $('#photo-list').append(card);
            setTimeout(function(){$('.card#' + id).fadeTo(1000, 1);}, 500);
        };
    }
}

// Make tags clickable and  peform search on click.
function getTags(tagsJson){
    var tags = "<p style=\"word-spacing: 0.5rem;\">";
    for(var i = 0; i < tagsJson.tag.length; i++){
        tags += "<a href=\"#" + tagsJson.tag[i].raw + "\" onClick=\"searchByTag(this);\">" + tagsJson.tag[i].raw + "<\/a>  ";
    }
    tags += "</p>";
    return tags;
}
