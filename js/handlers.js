//check input
function checkInput(){
  //if the search input is blank
  if($('#search').val()==''){
	//message is blank
	toggleMessage(true);

	//submit button is hidden
	toggleSubmit(false);

	//score button is hidden
	toggleScore(false);
  }
  //else (if the search input is not blank)
  else
  {
	//make a new regex object
	var rE = new RegExp(SEARCH_REGEX);

	//valid or not flag
	var validOrNot = rE.test($('#search').val());

	//set message
	toggleMessage(validOrNot);

	//set submit button visibility
	toggleSubmit(validOrNot);

	//score button is hidden
	toggleScore(validOrNot);
  }
}

//toggle message
function toggleMessage(clearOrMessage){
  //show or clear a message
  $('#message').text(clearOrMessage?'':'invalid search term');
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

//toggle score button
function toggleScore(showOrHide){
  //if hiding the button AND the button is currently visible
  if(!showOrHide && $('#score').is(':visible'))
	//hide the submit button
	$('#score').hide(300);
  //else if showing the button AND the button is currently hidden AND there is at least one 'paper' div
  else if(showOrHide && !$('#score').is(':visible') && $('#results').children().length>0)
	//show the submit button
	$('#score').show(300);
}

//clear click
function clearClick(){
  //clear previous results
  clear(true);
}

//send
function send(){
  //clear previous results
  clear(false);

  //fade in loading indicator
  $('#spinner1').fadeIn(200,function(){
	//load json via api
	$.getJSON(PROXY_URL+SEARCH_PATH+$('#search').val()+'/',CONSUMER_KEY,function(response,status,xhr){
	  //if error
	  if(status=='error')
		//show the error
		$('#message').text('Sorry but there was an error: '+xhr.status+' '+xhr.statusText);
	  //else (if no error)
	  else
	  {
		//for each json entry
		$.each(response.documents,function(key,val){
		  //results->div
		  $('<div>',{'id':val.uuid,'class':'paper'}).appendTo('#results');

		  //get the title
		  title = (val.title.length>70)?(val.title.substr(0,70)+'...'):val.title;

		  //div->anchor
		  $('<a>',{'href':val.mendeley_url,'target':'_blank','html':title,'mouseover':over,'mouseout':out}).
			appendTo('#'+val.uuid);

		  //div->break
		  $('<br>').appendTo('#'+val.uuid);

		  //div->authors
		  $('<span>',{'html':val.authors}).appendTo('#'+val.uuid);

		  //div->break
		  $('<br>').appendTo('#'+val.uuid);

		  //div->year
		  $('<span>',{'html':val.year}).appendTo('#'+val.uuid);

		  //corners not working properly if height is set via css
		  $('#'+val.uuid).css({'height':60});

		  //round corners
		  $('#'+val.uuid).corners('5px');
		});//end for each json entry

		//fade out the indicator
		$('#spinner1').fadeOut(200);

		//draw map
		drawMap();
	  }//end else (if no error)

	  //toggle score button
	  toggleScore(status!='error');
	});//end load json via api
  });//end fade in loading indicator
}

//mouse over handler
function over(){
  //
console.log('over');
}

//mouse out handler
function out(){
  //
console.log('out');
}