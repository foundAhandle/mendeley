//clear screen
function clear(clearAll){
  //if search input and hiding spinner
  if(clearAll){
	//clear search input
	$('#search').val('');

	//hide submit button
	toggleSubmit(false);

	//hide submit spinner
	$('#spinner1').hide();

	//hide score spinner
	$('#spinner2').hide();
  }

//HIDE MAP
//display: none

  //hide score button
  toggleScore(false);

  //remove all results
  $('#results').children().remove();
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

//send
function send(url,get,utilFunc){
  //fade in loading indicator
  $('#spinner1').fadeIn(200,function(){
	//load json via api
	$.getJSON(url,get,function(response,status,xhr){
	  //if error
	  if(status=='error')
		//show the error
		$('#message').text('Sorry but there was an error: '+xhr.status+' '+xhr.statusText);
	  //else (if no error)
	  else
	  {
		
		//store response
		storeResponse = response;
		originalResponse = jQuery.extend(true, {}, response);
		
		
		//sort response
		customSort(storeResponse);
		
		//utility function
		utilFunc(response);

		//fade out the indicator
		$('#spinner1').fadeOut(200);

//draw map
//drawMap(true);
	  }//end else (if no error)

	  //toggle score button
	  toggleScore(status!='error');
	});//end load json via api
  });//end fade in loading indicator
}

//populate teh page with documents
function populate(response){
  //for each json entry
  $.each(response.documents,function(key,val){
	//results->div
	$('<div>',{'id':val.uuid,'class':'paper'}).appendTo('#results');

	//get the title
	title = (val.title.length>70)?(val.title.substr(0,70)+'...'):val.title;

	//div->anchor
	$('<a>',{'href':val.mendeley_url,'target':'_blank','html':title,'mouseover':over,'mouseout':out}).appendTo('#'+val.uuid);

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
}