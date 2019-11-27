$(document).ready(function(){
	$("#input").val("");
})

var guideTitle = new URL(window.location.href).searchParams.get("title");
var apiLink = "https://en.wikivoyage.org/w/api.php?action=query&format=json&formatversion=2&prop=extracts%7Cimages&exlimit=1&imlimit=500&titles="+guideTitle;

$.ajax({
	url: apiLink,
	jsonp: "callback",
    dataType: "jsonp",
    xhrFields: { withCredentials: true },
	success: function(dataReceived){

		$("title").html(dataReceived.query.pages[0].title+" - Travel Guide @ Cicerone");
		$("#pageTitle").html(dataReceived.query.pages[0].title);

		$("#content").html(dataReceived.query.pages[0].extract);

		$(":header").each(function(){
			var text = $(this).text();
			var link = $(this).children(0).attr("id");


			if( $(this).is("h2") ){
				$("#navigator").append('<li class="menulevel-2"><a href="#'+link+'">'+text+'</a></li>');
			}
			else if( $(this).is("h3") ){
				$("#navigator").children(":last-child").append('<li class="menulevel-3"><a href="#'+link+'">'+text+'</a></li>');
			}
			else if( $(this).is("h4") ){
				$("#navigator").children(":last-child").children(":last-child").append('<li class="menulevel-4"><a href="#'+link+'">'+text+'</a></li>');
			}
			else if( $(this).is("h5") ){
				$("#navigator").children(":last-child").children(":last-child").children(":last-child").append('<li class="menulevel-5"><a href="#'+link+'">'+text+'</a></li>');
			}
		})
		$("#guideLink").attr("href", "https://en.wikivoyage.org/wiki/"+dataReceived.query.pages[0].title);
	}
});


// wikivoyage opensearch results shown as search suggestions
$("#input").keyup(function(){
  searchTerm =  $(this).val();
  url = "https://en.wikivoyage.org/w/api.php?action=opensearch&limit=5&namespace=0&format=json&formatversion=2&search=";
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
