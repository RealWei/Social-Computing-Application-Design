var selected1; //第一個分類的選項
var selected2; //第二個分類的選項



var post_id = 0; //用來記錄那篇文章的id

var friends_list = new Array(); //有使用我們app的朋友名單
var Name = new Array();
var img_url = new Array();
var comment = new Array();
var likes = new Array(); //讚數
var unlikes = new Array(); //不讚數
var ShopName = new Array();
var FoodName = new Array();
var type = new Array();
var meal = new Array();
var Address = new Array();
var created_Time = new Array();
var storyID = new Array();
var userFBID;
var new_post_num;
var Aftersearch_pk = new Array();
var Aftersort_pk = new Array();

var likeisclicked = new Array();
var unlikeisclicked = new Array();
var output = '';
var getDataUrl = 'http://36.226.104.37:8000/stories/';
MM = {
    Jan: "1月",
    Feb: "2月",
    Mar: "3月",
    Apr: "4月",
    May: "5月",
    Jun: "6月",
    Jul: "7月",
    Aug: "8月",
    Sep: "9月",
    Oct: "10月",
    Nov: "11月",
    Dec: "12月"
};

// <div class=\"card medium\" style = \"overflow:hidden; margin-left:center;\">
//         <div class=\"card-image waves-effect waves-block waves-light\">
//             <img class=\"activator\" src=\"../static/images/office.jpg\">
//             <a id = \"photo"+post_id+"\">"+img_url+"</a>
//         </div>
//         <div class=\"card-content\" style=\"text-align:center;\">
//             <span class=\"card-title activator grey-text text-darken-4\" id = \"name"+post_id+"\">"+Name+"</span>
//             <p style=\"text-align:center;\" id = \"comment"+post_id+"\">"+comments+"</p>
//             <p style=\"text-align:center;\">
//               <a style=\"text-align:center;\"  id = \"likes"+post_id+"\">"+likes+"齁甲，"+unlikes+"不喜番</a><br>
//               <HR size=\"10\"width=\"10%\">
//               <button id = \"likebtn"+post_id+"\" onclick=\"Like(this.id)\" >齁甲</button>
//               <button id = \"unlikebtn"+post_id+"\" onclick=\"DontLike(this.id)\" >不喜番</button>
//             </p>
//         </div>
//       </div>
// <div class="card">
//    <div class="card-image waves-effect waves-block waves-light">
//      <img class="activator" src="images/office.jpg">
//    </div>
//    <div class="card-content">
//      <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
//    </div>
//    <div class="card-reveal">
//      <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
//      <p>Here is some more information about this product that is only revealed once clicked on.</p>
//    </div>
//  </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         <a class = "btn2" id = \"likebtn"+post_id+"\" onclick = "test(this,this.id)"><i class="small material-icons" >thumb_up</i> 好吃</a><button class=\"btn1\" id = \"likebtn"+post_id+"\" onclick=\"Like(this,this.id)\" >齁甲</button><button class=\"btn1\" id = \"unlikebtn"+post_id+"\" onclick=\"DontLike(this,this.id)\" >歹甲</button>
// var output="<div id = \"post"+post_id+"\" class=\"card medium\" style = \"overflow:hidden; float:center;\"><div class=\"card-image waves-effect waves-block waves-light\"><img class=\"activator\" src=\"../static/images/office.jpg\"></img><p class=\"card-title\" style=\"font-size:30px;\">"+ShopName+"</p><br><span class=\"card-title\" style=\"text-align:right;\">"+FoodName+"</span><a id = \"photo"+post_id+"\">"+img_url+"</a></div><div class=\"card-content\" style=\"text-align:center;\"><span style=\"margin:auto;\"class=\"card-title activator grey-text text-darken-4\" id = \"name"+post_id+"\">"+Name+"</span><span style=\"float:right;\">"+"2016/1/1"+"</span>"+"<p style=\"text-align:center;\" id = \"comment"+post_id+"\">"+comment+"</p><a style=\"text-align:center;\"  id = \"likes"+post_id+"\">"+likes[0]+"齁甲，"+unlikes[0]+"歹甲</a><br><HR size=\"10\"width=\"90%\"><a class = \"btn2\" id = \"likebtn"+post_id+"\" onclick = \"Like(this,this.id)\"><i class=\"small material-icons\" >thumb_up</i>好吃</a><a class = \"btn2\" id = \"unlikebtn"+post_id+"\" onclick = \"DontLike(this,this.id)\"><i class=\"small material-icons\" >thumb_down</i>難吃</a></div><div class=\"card-reveal\"><span class=\"card-title grey-text text-darken-4\" id = \"type"+post_id+"\">"+type+"<i class=\"material-icons right\">close</i></span>"+"<span id = \"meal"+post_id+"\" >"+meal+"</span><br><div id=\"map_canvas\" style=\"width:968px;height:300px;\"><iframe width=\"900\" height=\"300\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" align=\"center\" src=http://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q="+Address+"&z=16&output=embed&t=></iframe></div></div></div><br><HR size=\"10\"width=\"90%\">";

$(document).ready(function() {
    //alert(xx);
    $('select').material_select();
    $('.collapsible').collapsible({
        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $("#hey").click(function() {
        var getDataUrl = 'http://36.226.104.37:8000/stories/';
        $.getJSON(getDataUrl, function(data) {
            for (var i = 0; i < data.length; i++) {
                var type = data[i].fields.address;
                alert("type = " + type);
            }

        });
    });

});

function WhatToEat() {
    window.location.reload();
}

function useStar() {
    output = "";
    // alert("沒朋友，使用金幣");
    //使用星星
    console.log("使用金幣");

    $.get('http://36.226.104.37:8000/recommend/', {
        userFBID: userFBID
    }, (function() {
            return function(data) {
                console.log("使用金幣");
                if (data.length == 0) {
                    alert("都沒按過讚");
                } else {
                    var geocoder, map, zoom = 16;
                    var directionsService = new google.maps.DirectionsService();
                    var latlng = new google.maps.LatLng(25.10, 121.55);
                    geocoder = new google.maps.Geocoder();
                    var mapOptions = {
                        center: latlng,
                        zoom: zoom,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    //output="<div id=\"main_map\"></div>"
                    //document.getElementById('map').innerHTML = output;
                    document.getElementById('main_map').style.display = 'block';
                    map = new google.maps.Map(document.getElementById("main_map"), mapOptions);
                    for (var i = 0; i < data.length; i++) {
                        storyID[i] = data[i].pk;
                        meal[data[i].pk] = data[i].fields.meal;
                        Address[data[i].pk] = data[i].fields.address;
                        ShopName[data[i].pk] = data[i].fields.shopName;
                        type[data[i].pk] = data[i].fields.type;
                        img_url[data[i].pk] = "http://36.226.104.37:8000/media/" + data[i].fields.photo;
                        likes[data[i].pk] = data[i].fields.likes;
                        FoodName[data[i].pk] = data[i].fields.foodName;

                        //----------------時間需要轉換
                        tmp_createdTime = data[i].fields.created_time;
                        timeZone = "+08:00";
                        res = tmp_createdTime.concat(timeZone);
                        created_Time[data[i].pk] = String(new Date(res)).replace(
                                /\w{3} (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):[^(]+\(([A-Z]{3})\)/,
                                function($0, $1, $2, $3, $4, $5, $6) {
                                    return $3 + "," + MM[$1] + $2 + "日" + " " + ((+$4 + 8) > 24 ? (+$4 + 8 - 24) : (+$4 + 8)) + ":" + $5
                                }
                            )
                            //--------------------------
                        comment[data[i].pk] = data[i].fields.message;
                        unlikes[data[i].pk] = data[i].fields.dislikes;

                        Name[data[i].pk] = data[i].fields.userName;

                        output += "<div id = \"post" + data[i].pk + "\" class=\"card medium\"><div class=\"card-image waves-effect waves-block waves-light\"><img class=\"activator\" src=\"" + img_url[data[i].pk] + "\"></img><p class=\"card-title\" style=\"font-size:30px;\">" + ShopName[data[i].pk] + "</p><br><span class=\"card-title\" style=\";\">" + FoodName[data[i].pk] + "</span></div><div class=\"card-content\" style=\";\"><span style=\";\"class=\"card-title activator grey-text text-darken-4\" id = \"name" + data[i].pk + "\">" + Name[data[i].pk] + "</span><span style=\"float:right;\">" + created_Time[data[i].pk] + "</span>" + "<p style=\";\" id = \"comment" + data[i].pk + "\">" + comment[data[i].pk] + "</p><a style=\"text-align:center;\"  id = \"likes" + data[i].pk + "\">" + likes[data[i].pk] + "齁甲，" + unlikes[data[i].pk] + "歹甲</a><br><HR size=\"10\"width=\"100%\"><a class = \"btn2\" id = \"likebtn" + data[i].pk + "\" onclick = \"Like(this,this.id)\"><i class=\"small material-icons\" >thumb_up</i>齁甲</a><a class = \"btn2\" id = \"unlikebtn" + data[i].pk + "\" onclick = \"DontLike(this,this.id)\"><i class=\"small material-icons\" >thumb_down</i>歹甲</a></div><div class=\"card-reveal\"><span class=\"card-title grey-text text-darken-4\" id = \"type" + data[i].pk + "\">" + type[data[i].pk] + "<i class=\"material-icons right\">close</i></span>" + "<span id = \"meal" + data[i].pk + "\" >" + meal[data[i].pk] + "</span><br><div id=\"map_canvas\" style=\"width:100%;height:300px;\"><iframe width=\"100%\" height=\"300px\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" align=\"center\" src=http://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=" + Address[data[i].pk] + "&z=16&output=embed&t=></iframe></div></div></div><br><HR size=\"10\"width=\"50%\">";
                        geocoder.geocode({
                                'address': Address[data[i].pk]
                            },
                            function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    var marker = new google.maps.Marker({
                                        position: results[0].geometry.location,
                                        icon: 'http://36.226.104.37:8000/media/images/good.png'
                                    });
                                    marker.setMap(map);
                                    map.setCenter(results[0].geometry.location);

                                }
                            }
                        );
                        document.getElementById('ShowNews').innerHTML = output;
                    }
                    map = new google.maps.Map(document.getElementById("main_map"), mapOptions);
                }
            };
        }


    )());
    //金幣的部分
    //取得金幣數量
    $.get('http://36.226.104.37:8000/user/', {
        userFBID: userFBID
    }, function(data, textStatus, xhr) {
        console.log(data);
        console.log("status:" + xhr.status);
        if (xhr.status == 204) {
            aler("Out of Coins");
        } else {
            var coins = data[0].fields.coins;
            document.getElementById("coins").innerHTML = "<i class=\"material-icons left\">local_atm</i>" + "X" + coins;
        }

    });

}


//依照所選的selected1 selected2做分類
function Sort() {
    $('#preloader').fadeIn();
    console.log("～～～～～～～～～" + Aftersearch_pk.length);

    selected1 = document.getElementById('form1').type1.value;
    selected2 = document.getElementById('form2').type2.value;
    output = '';
    console.log("～～～～～～～～～" + Aftersearch_pk.length);
    if (Aftersearch_pk.length == 0) {
        console.log("沒先搜尋過");
        console.log(selected1 + "   " + selected2);
        if (selected1 == "" && selected2 != "") {
            console.log(1);
            for (var i = 0; i < post_id; i++) {

                tmp_Search_type = document.getElementById("type" + storyID[i]).innerHTML;
                var Search_type = tmp_Search_type.replace("<i class=\"material-icons right\">close</i>", "");
                console.log("Search_type.valueOf():" + Search_type.valueOf() + "  selected1.valueOf():" + selected1.valueOf());
                if (Search_type.valueOf() == selected2.valueOf()) {
                    output += "<div id = \"post" + storyID[i] + "\" class=\"card medium\" >" + document.getElementById('post' + storyID[i]).innerHTML + "</div><br><HR size=\"10\"width=\"50%\">";
                    Aftersort_pk.push(storyID[i]);
                    $('#preloader').fadeOut();
                }
            }
            document.getElementById('ShowNews').innerHTML = output;
            if (output == '') {
                $('#preloader').fadeOut();
                alert("沒有此分類");
            }
        } else if (selected1 != "" && selected2 == "") {
            console.log(2);

            for (var i = 0; i < post_id; i++) {

                Search_meal = document.getElementById("meal" + storyID[i]).innerHTML;
                console.log("Search_meal.valueOf():" + Search_meal.valueOf() + "  selected1.valueOf():" + selected1.valueOf());
                if (Search_meal.valueOf() == selected1.valueOf()) {
                    output += "<div id = \"post" + storyID[i] + "\" class=\"card medium\" >" + document.getElementById('post' + storyID[i]).innerHTML + "</div><br><HR size=\"10\"width=\"50%\">";
                    $('#preloader').fadeOut();
                    Aftersort_pk.push(storyID[i]);
                }
            }
            document.getElementById('ShowNews').innerHTML = output;
            if (output == '') {
                $('#preloader').fadeOut();
                alert("沒有此分類");
            }

        } else if (selected1 != "" && selected2 != "") {
            console.log(3);

            for (var i = 0; i < post_id; i++) {
                Search_meal = document.getElementById("meal" + storyID[i]).innerHTML;
                console.log(Search_meal.valueOf() + "  " + selected2.valueOf());
                tmp_Search_type = document.getElementById("type" + storyID[i]).innerHTML;
                var Search_type = tmp_Search_type.replace("<i class=\"material-icons right\">close</i>", "");
                console.log(Search_type.valueOf() + "  " + selected1.valueOf());

                if (Search_meal.valueOf() == selected1.valueOf()) {
                    if (Search_type.valueOf() == selected2.valueOf()) {
                        output += "<div id = \"post" + storyID[i] + "\" class=\"card medium\" style = \"overflow:hidden; margin-left:center;\">" + document.getElementById('post' + storyID[i]).innerHTML + "</div><br><HR size=\"10\"width=\"50%\">";
                        $('#preloader').fadeOut();
                        Aftersort_pk.push(storyID[i]);
                    }
                }
            }
            document.getElementById('ShowNews').innerHTML = output;
            if (output == '') {
                $('#preloader').fadeOut();
                alert("沒有此分類");
            }
        } else if (selected1 == "" && selected2 == "") {
            $('#preloader').fadeOut();
            alert("請至少選擇一項來分類");
        }
    } else {
        console.log("先搜尋過");
        if (selected1 == "" && selected2 != "") {
            for (var i = 0; i < Aftersearch_pk.length; i++) {

                tmp_Search_type = document.getElementById("type" + Aftersearch_pk[i]).innerHTML;
                var Search_type = tmp_Search_type.replace("<i class=\"material-icons right\">close</i>", "");

                if (Search_type.valueOf() == selected2.valueOf()) {
                    output += "<div id = \"post" + Aftersearch_pk[i] + "\" class=\"card medium\" >" + document.getElementById('post' + Aftersearch_pk[i]).innerHTML + "</div><br><HR size=\"10\"width=\"50%\">";
                    Aftersort_pk.push(storyID[i]);

                    $('#preloader').fadeOut();
                }
            }
            document.getElementById('ShowNews').innerHTML = output;
            if (output == '') {
                $('#preloader').fadeOut();
                alert("沒有此分類");
            }
        } else if (selected1 != "" && selected2 == "") {
            for (var i = 0; i < Aftersearch_pk.length; i++) {

                Search_meal = document.getElementById("meal" + Aftersearch_pk[i]).innerHTML;

                if (Search_meal.valueOf() == selected1.valueOf()) {
                    output += "<div id = \"post" + Aftersearch_pk[i] + "\" class=\"card medium\" >" + document.getElementById('post' + Aftersearch_pk[i]).innerHTML + "</div><br><HR size=\"10\"width=\"50%\">";
                    Aftersort_pk.push(storyID[i]);
                    $('#preloader').fadeOut();
                }
            }
            document.getElementById('ShowNews').innerHTML = output;
            if (output == '') {
                $('#preloader').fadeOut();
                alert("沒有此分類");
            }
        } else if (selected1 != "" && selected2 != "") {
            alert("hidden");
            for (var i = 0; i < Aftersearch_pk.length; i++) {
                Search_meal = document.getElementById("meal" + Aftersearch_pk[i]).innerHTML;

                tmp_Search_type = document.getElementById("type" + Aftersearch_pk[i]).innerHTML;
                var Search_type = tmp_Search_type.replace("<i class=\"material-icons right\">close</i>", "");
                if (Search_meal.valueOf() == selected1.valueOf()) {
                    if (Search_type.valueOf() == selected2.valueOf()) {
                        output += "<div id = \"post" + Aftersearch_pk[i] + "\" class=\"card medium\">" + document.getElementById('post' + Aftersearch_pk[i]).innerHTML + "</div><br><HR size=\"10\"width=\"50%\">";
                        Aftersort_pk.push(storyID[i]);

                        $('#preloader').fadeOut();

                    }
                }
            }
            document.getElementById('ShowNews').innerHTML = output;
            if (output == '') {
                $('#preloader').fadeOut();
                alert("沒有此分類");
            }
        } else if (selected1 == "" && selected2 == "") {
            $('#preloader').fadeOut();
            alert("請至少選擇一項來分類");
        }

    }
}
//搜尋朋友名單
function Search() {
    $('#preloader').fadeIn();
    var tmp = document.getElementById('search').value;
    var search_output = '';
    if (tmp == '') {
        alert("請輸入名字");
        $('#preloader').fadeOut();
    } else {
        document.getElementById('search').value = '';
        var myInnerHtml;
        if (Aftersort_pk.length == 0) {
            for (var i = 0; i < post_id; i++) {
                var tmp_Search_Name = document.getElementById("name" + storyID[i]).innerHTML;
                var Search_Name = tmp_Search_Name.replace("<i class=\"material-icons right\">more_vert</i>", "");
                if (Search_Name.valueOf() == tmp.valueOf()) {
                    search_output += "<div id = \"post" + storyID[i] + "\" class=\"card medium\" >" + document.getElementById('post' + storyID[i]).innerHTML + "</div><br><HR size=\"10\"width=\"50%\">";
                    Aftersearch_pk.push(storyID[i]);
                }
            }
            document.getElementById('ShowNews').innerHTML = search_output;
            $('#preloader').fadeOut();
            if (search_output == '') {
                $('#preloader').fadeOut();
                alert("沒有動態可顯示");
            }
        } else {
            for (var i = 0; i < Aftersort_pk.length; i++) {
                var tmp_Search_Name = document.getElementById("name" + Aftersort_pk[i]).innerHTML;
                var Search_Name = tmp_Search_Name.replace("<i class=\"material-icons right\">more_vert</i>", "");
                // alert(document.getElementById('post'+Aftersort_pk[i]).innerHTML);
                if (Search_Name.valueOf() == tmp.valueOf()) {
                    search_output += "<div id = \"post" + Aftersort_pk[i] + "\" class=\"card medium\" >" + document.getElementById('post' + Aftersort_pk[i]).innerHTML + "</div><br><HR size=\"10\"width=\"50%\">";
                }
            }
            document.getElementById('ShowNews').innerHTML = search_output;

            $('#preloader').fadeOut();

            if (search_output == '') {
                $('#preloader').fadeOut();
                alert("沒有動態可顯示");
            }
        }

    }
}
//按讚後的功能，讓按鈕不能再按，並且要在讚數+1，同時跟新到資料庫
function Like(btn, like_id) {
    var Id = like_id.replace("likebtn", "");
    var unlikebtnid = "unlikebtn" + Id;
    if (likeisclicked[Id] == 1 && unlikeisclicked[Id] == null) {
        btn.className = "btn2";

        likes[Id] -= 1;
        document.getElementById('likes' + Id).innerHTML = likes[Id] + "齁甲， " + unlikes[Id] + "歹甲";
        document.getElementById(unlikebtnid).disabled = false;
        likeisclicked[Id] = null;
        $.post("http://36.226.104.37:8000/deleteVote/", {
            storyID: Id,
            userFBID: userFBID,
            score: -1
        }, function(result) {});
    } else if (likeisclicked[Id] == null && unlikeisclicked[Id] == null) {
        btn.className = "btn2press";

        likes[Id] += 1;
        document.getElementById(unlikebtnid).onclick.disabled = true;
        document.getElementById('likes' + Id).innerHTML = likes[Id] + "齁甲， " + unlikes[Id] + "歹甲";
        likeisclicked[Id] = 1;
        $.post("http://36.226.104.37:8000/vote/", {
            storyID: Id,
            userFBID: userFBID,
            score: 1
        }, function(result) {});
    } else if (unlikeisclicked[Id] == 1) {
        alert("只能選擇一個");
    }
}
//按不讚後的功能，讓按鈕不能再按，並且要在不讚數+1，同時跟新到資料庫
function DontLike(btn, unlike_id) {
    var Id = unlike_id.replace("unlikebtn", "");
    var likebtnid = "likebtn" + Id;

    if (unlikeisclicked[Id] == 1 && likeisclicked[Id] == null) {
        btn.className = "btn2";
        unlikes[Id] -= 1;
        document.getElementById('likes' + Id).innerHTML = likes[Id] + "齁甲， " + unlikes[Id] + "歹甲";
        document.getElementById(likebtnid).disabled = false;
        unlikeisclicked[Id] = null;
        $.post("http://36.226.104.37:8000/deleteVote/", {
            storyID: Id,
            userFBID: userFBID,
            score: -1
        }, function(result) {});
    } else if (unlikeisclicked[Id] == null && likeisclicked[Id] == null) {
        btn.className = "btn2press";
        unlikes[Id] += 1;
        document.getElementById(likebtnid).disabled = true;
        document.getElementById('likes' + Id).innerHTML = likes[Id] + "齁甲， " + unlikes[Id] + "歹甲";
        unlikeisclicked[Id] = 1;
        $.post("http://36.226.104.37:8000/vote/", {
            storyID: Id,
            userFBID: userFBID,
            score: -1
        }, function(result) {});
    } else if (likeisclicked[Id] == 1) {

        alert("只能選擇一個");
    }

}
//ＦＢ stuff
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    // alert(response.status);
    $(".button-collapse").sideNav();
    if (response.status === 'connected') {
        //alert("FB登入囉！");
        $("#fb_login_btn").hide();
        $("#profile_image").show();


        //--------------------------------------這邊拿到朋友資料之後，記得要把output修改成朋友的貼文
        $('#preloader').fadeOut();

        FB.api('/me', 'GET', {
                "fields": "friends,email,name"
            },
            function(response) {
                userName = response.name;
                userFBID = response.id;
                results = response.friends.data;
                userEmail = response.email;
                localStorage.setItem("userFBID", userFBID);
                var img_url = "https://graph.facebook.com/" + userFBID + "/picture?width=200&height=200"
                document.getElementById('FBphoto_sticker').innerHTML += "<img src =\"" + img_url + "\"" + "class=\"circle responsive-img\"/>";
                if (results.length == 0) {
                    // alert("都沒人使用過ＡＰＰ");
                } else {
                    for (var i = 0; i < results.length; i++) {
                        console.log("friends:" + results[i].id);
                        friends_list.push(results[i].id);
                    }
                }
                friends_list.push(userFBID);

                //註冊server上的資料
                $.post("http://36.226.104.37:8000/register/", {
                    fbID: userFBID,
                    name: userName,
                    email: userEmail,
                    friends: friends_list
                }, function(data, textStatus, xhr) {
                    console.log("status:" + xhr.status);
                });
                //取得金幣數量
                $.get('http://36.226.104.37:8000/user/', {
                    userFBID: userFBID
                }, function(data, textStatus, xhr) {
                    console.log(data);
                    console.log("status:" + xhr.status);
                    if (xhr.status == 204) {
                        aler("Out of Coins");
                    } else {
                        var coins = data[0].fields.coins;
                        document.getElementById("coins").innerHTML = "<i class=\"material-icons left\">local_atm</i>" + "X" + coins;
                    }
                });
                //po文
                $.getJSON('http://36.226.104.37:8000/stories/', {
                    friends: friends_list
                }, function(data) {
                    output = '';
                    console.log("data:");
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        // console.log("data[i].pk : "+ data[i].pk);
                        storyID[i] = data[i].pk; //用來記錄現在每篇文的pk是多少
                        meal[data[i].pk] = data[i].fields.meal;
                        Address[data[i].pk] = data[i].fields.address;
                        ShopName[data[i].pk] = data[i].fields.shopName;
                        type[data[i].pk] = data[i].fields.type;
                        likes[data[i].pk] = data[i].fields.likes;
                        FoodName[data[i].pk] = data[i].fields.foodName;

                        //----------------時間需要轉換
                        tmp_createdTime = data[i].fields.created_time;
                        timeZone = "+08:00";
                        res = tmp_createdTime.concat(timeZone);

                        created_Time[data[i].pk] = String(new Date(res)).replace(
                                /\w{3} (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):[^(]+\(([A-Z]{3})\)/,
                                function($0, $1, $2, $3, $4, $5, $6) {
                                    return $3 + "," + MM[$1] + $2 + "日" + " " + ((+$4 + 8) > 24 ? (+$4 + 8 - 24) : (+$4 + 8)) + ":" + $5
                                }
                            )
                            //--------------------------
                        comment[data[i].pk] = data[i].fields.message;
                        unlikes[data[i].pk] = data[i].fields.dislikes;
                        Name[data[i].pk] = data[i].fields.userName;
                        output += "<div id = \"post" + data[i].pk + "\" class=\"card medium\"><div class=\"card-image waves-effect waves-block waves-light\"><img class=\"activator\" src=\"" + "http://36.226.104.37:8000/media/" + data[i].fields.photo + "\"></img><p class=\"card-title\" style=\"font-size:30px;\">" + ShopName[data[i].pk] + "</p><br><span class=\"card-title\" style=\";\">" + FoodName[data[i].pk] + "</span></div><div class=\"card-content\" style=\";\"><span style=\";\"class=\"card-title activator grey-text text-darken-4\" id = \"name" + data[i].pk + "\">" + Name[data[i].pk] + "</span><span style=\"float:right;\">" + created_Time[data[i].pk] + "</span>" + "<p style=\";\" id = \"comment" + data[i].pk + "\">" + comment[data[i].pk] + "</p><a style=\"text-align:center;\"  id = \"likes" + data[i].pk + "\">" + likes[data[i].pk] + "齁甲，" + unlikes[data[i].pk] + "歹甲</a><br><HR size=\"10\"width=\"100%\"><a class = \"btn2\" id = \"likebtn" + data[i].pk + "\" onclick = \"Like(this,this.id)\"><i class=\"small material-icons\" >thumb_up</i>齁甲</a><a class = \"btn2\" id = \"unlikebtn" + data[i].pk + "\" onclick = \"DontLike(this,this.id)\"><i class=\"small material-icons\" >thumb_down</i>歹甲</a></div><div class=\"card-reveal\"><span class=\"card-title grey-text text-darken-4\" id = \"type" + data[i].pk + "\">" + type[data[i].pk] + "<i class=\"material-icons right\">close</i></span>" + "<span id = \"meal" + data[i].pk + "\" >" + meal[data[i].pk] + "</span><br><div id=\"map_canvas\" style=\"width:100%;height:300px;\"><iframe width=\"100%\" height=\"300px\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" align=\"center\" src=http://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=" + Address[data[i].pk] + "&z=16&output=embed&t=></iframe></div></div></div><br><HR size=\"10\"width=\"50%\">";
                        document.getElementById('ShowNews').innerHTML = output;
                        //判斷是否按過讚
                        post_id += 1;
                    }
                    //看是否這篇文有按讚過
                    console.log("總共有這麼多篇文=" + post_id);
                    for (var i = 0; i < post_id; i++) {
                        var pk = storyID[i];
                        $.get('http://36.226.104.37:8000/votes/', {
                            storyID: pk,
                            userFBID: userFBID
                        }, (function() {
                            var ii = i;
                            var pkk = pk;
                            return function(data1) {
                                //console.log("有沒有按讚"+data1);
                                // do_something_with_data(data, ii);
                                if (data1.length == 0) {
                                    //alert("都沒按過讚");
                                } else {
                                    for (var j = 0; j < data1.length; j++) {
                                        if (data1[j].fields.user == userFBID) {
                                            if (data1[j].fields.score == -1) {
                                                unlikeisclicked[pkk] = 1;
                                                document.getElementById('unlikebtn' + pkk).className = "btn2press";
                                            } else if (data1[j].fields.score == 1) {
                                                likeisclicked[pkk] = 1;
                                                document.getElementById('likebtn' + pkk).className = "btn2press";
                                            } else {}
                                        }
                                    }
                                }
                            };
                        })());
                    }
                });
            }
        );
    } else if (response.status === 'not_authorized') {
        alert('~~~~~~~~Please log ' + 'into this app.');
        $("#fb_login_btn").show();
        FB.login(function(response) {});
    } else {
        FB.login(function(response) {});
        alert('Please log ' + 'into Facebook.');
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}
window.fbAsyncInit = function() {
    FB.init({
        appId: '798418086968769',
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.5' // use version 2.2
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};
