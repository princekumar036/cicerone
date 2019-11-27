// loads background image from json file
$(document).ready(function(){

  $("#input").val(""); //make input value empty on page reload

  $.ajax({
    url: "earthview.json",
    success: function(bgimagesarr){
      var random_no = Math.floor(Math.random()*(bgimagesarr.length+1));
      var bgimage = bgimagesarr[random_no].image;
      var img_region = bgimagesarr[random_no].region;
      var img_country = bgimagesarr[random_no].country;
      var img_geolocation = bgimagesarr[random_no].map;

      document.body.style.background = "url('"+ bgimage +"') no-repeat center center fixed";
      $("#locationLink").attr("href", img_geolocation);
      if(img_region == ""){ $("#bgLocation").html(img_country) }
      else{ $("#bgLocation").html(img_region + ", " + img_country) }
    }
  });
});

// wikivoyage opensearch results shown as search suggestions
$("#input").keyup(function(){
  searchTerm =  $(this).val();
  url = "https://en.wikivoyage.org/w/api.php?action=opensearch&limit=10&namespace=0&format=json&formatversion=2&search=";
  url += searchTerm;
    $.ajax({
    url: url,
    jsonp: "callback",
    dataType: "jsonp",
    xhrFields: { withCredentials: true },
    success: function(result){
      var write = "";
      for(i=0; i<result[1].length; i++){
        write += "<a href='eguide.html?title="+result[3][i].slice(31)+"' class='searhSuggestionLink'><div class='searhSuggestion'>"+result[1][i]+"</div></a>";
      }
      $("#searchSuggestionGroup").html(write);
    }
  });
});

// toggles search suggestions when input loses or gains focus
// $("#searchGroup").on("focusout", function() {
//   $("#searchSuggestionGroup").hide();
// }).on("focusin", function() {
//   $("#searchSuggestionGroup").show();
// });