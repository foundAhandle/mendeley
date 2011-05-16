//check input
function checkInput(){
  //toggle message
  toggleMessage($('#search').val()!='');

  //toggle submit button
  toggleSubmit($('#search').val()!='');
}

//toggle message
function toggleMessage(clearOrMessage){
  //show or clear a message
  $('#message').text(clearOrMessage?'':'enter a search term');
}

//toggle submit button
function toggleSubmit(showOrHide){
  //if hiding the button AND the button is currently visible
  if(!showOrHide && $('#submit').is(':visible'))
	//hide the submit button
	$('#submit').hide(300);
  //else if showing the button AND the button is currently hidden
  else if(showOrHide && !$('#submit').is(':visible'))
	//show the submit button
	$('#submit').show(300);
}

//send
function send(){
  //fade in loading indicator
  $('#spinner').fadeIn(200,function(){
	//get json object
//$('#results').load('http://api.mendeley.com/oapi/documents/search/test;weather/',
//'consumer_key=973a9d58c1f8ffe7155e5d5136183ff304dcb3fb6',function(response,status,xhr){
//TESTING
$('#results').load('json.txt',function(response,status,xhr){
//$('#results').load('http://10.natalilabsproject.appspot.com/currentdate/',function(response,status,xhr){
//TESTING
	  //fade out the indicator
	  $('#spinner').fadeOut(200);

	  //if error
	  if(status=='error')
		//show the error
		$('#message').text('Sorry but there was an error: '+xhr.status+' '+xhr.statusText);
	  //else (if no error)
//	  else
		//fade in the results

	});
  });

/*
$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  {
    tags: "cat",
    tagmode: "any",
    format: "json"
  },
  function(data) {
*/
//console.log('success');
/*
    $.each(data.items, function(i,item){
      $("<img/>").attr("src", item.media.m).appendTo("#images");
      if ( i == 3 ) return false;
    });
*/
//  });
}