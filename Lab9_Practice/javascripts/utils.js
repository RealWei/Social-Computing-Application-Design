(function() {
  //[Lab 9] Fill the key
  var Google_Spreadsheet_Key = '1y6mmyUYL5XGuC4kOutgO_slFkK4-puq2eBIlDWp7VS0';
  var url = 'https://spreadsheets.google.com/feeds/cells/' + Google_Spreadsheet_Key + '/1/public/values?alt=json-in-script&callback=?';

  var result;
  var row_in = [];
  var row_out = [];

  $.getJSON(url, function(data) {
      result = data.feed.entry;
      console.log( result[0] );
      for(var i = 0; i < result.length; i++){
          if(result[i].gs$cell.row == "1"){
              row_in.push(result[i].gs$cell.$t);
          }
          else{
              row_out.push(result[i].gs$cell.$t);
          }
      }
  });

  var divIn = document.getElementById("in");
  divIn.addEventListener("click", function() {
    $("#suggestion").text("");
    showSugggestion(1);
  });
  var divOut = document.getElementById("out");
  divOut.addEventListener("click", function() {
    $("#suggestion").text("");
    showSugggestion(2);
  });

  function getRandomItem(array) {
    return array[Math.floor(Math.random()*array.length)];
  }

  function showSugggestion(place) {
      if(place == 1){
          $("#suggestion").text(getRandomItem(row_in));
      }
      else{
          $("#suggestion").text(getRandomItem(row_out));
      }

  }
})();
