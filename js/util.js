//clear screen
function clear(clearAll){
  //if search input and hiding spinner
  if(clearAll){
	//clear search input
	$('#search').val('');
	
	$('#authsearch').val('');

	//hide submit button
	toggleSubmit(false);
	toggleNext(false);
	togglePrior(false);
	
	$("#currentpage").text("");
	
	//hide submit spinner
	$('#spinner1').hide();

	//hide score spinner
	$('#spinner2').hide();
	
	//reset page number
	pageNumber = 0;
  }

//HIDE MAP
//display: none

  //hide score button
  toggleScore(false);

  //remove all results
  $('#results').children().remove();

  //slide info up
  $('#info').slideUp();

  //clear info
  $('#info').children().remove();
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

function toggleNext(showOrHide){
  //if hiding the button AND the button is currently visible
  if(!showOrHide && $('#next').is(':visible'))
	//hide the submit button
	$('#next').hide(300);
  //else if showing the button AND the button is currently hidden
  else if(showOrHide && !$('#next').is(':visible'))
	//show the submit button
	$('#next').show(300);
}

function togglePrior(showOrHide){
  //if hiding the button AND the button is currently visible
  if(!showOrHide && $('#previous').is(':visible'))
	//hide the submit button
	$('#previous').hide(300);
  //else if showing the button AND the button is currently hidden
  else if(showOrHide && !$('#previous').is(':visible'))
	//show the submit button
	$('#previous').show(300);
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
//what's this?
if(!val.title)
  //should this be a 'continue'?
  return;
	
	//results
	$('<div>',{'id':val.uuid,'class':'ui-widget-content round-me paper'}).appendTo('#results');

	  //title container
	  $('<div>',{'id':val.uuid+'-title'}).appendTo('#'+val.uuid);

		//title
		$('<a>',{'href':val.mendeley_url,'target':'_blank','html':val.title}).appendTo('#'+val.uuid+'-title');

	  //authors container
	  $('<div>',{'id':val.uuid+'-authors','class':'resultAuthors'}).appendTo('#'+val.uuid);

		//authors
		$('<span>',{'html':val.authors}).appendTo('#'+val.uuid+'-authors');

	  //year and 'more info' container
	  $('<div>',{'id':val.uuid+'-year','class':'resultYearAndMoreInfo'}).appendTo('#'+val.uuid);

		//year
		$('<span>',{'html':val.year}).appendTo('#'+val.uuid+'-year');

		//more info
		$('<a>',{'id':val.uuid+'-info','href':"javascript:moreInfo('"+val.uuid+"')",'html':'more info','class':'moreInfo'}).
		  appendTo('#'+val.uuid+'-year');

	//corners not working properly if height is set via css
//	$('#'+val.uuid).css({'height':60});

	//round corners
//	$('#'+val.uuid).corners('5px');
  });//end for each json entry
}

//more info
function moreInfo(uuid){
  //slide info up
  $('#info').slideUp();

  //clear info
  $('#info').children().remove();

  //change all 'more info's to black
  $('#results a').css({'color':'#000'});

  //change chosen 'more info' to red
  $('#'+uuid+'-info').css({'color':'#F00'});

  //load json via api
  $.getJSON(PROXY_URL+DETAILS_PATH+'/'+uuid+'/',
			{'consumer_key':'973a9d58c1f8ffe7155e5d5136183ff304dcb3fb6'},
			function(response,status,xhr){
	//if no error
	if(status!='error')
	  //add info container
	  infoContainer(response);
  });
}

//info container
function infoContainer(info){
  //if 'type'
  if(info.hasOwnProperty('type')){
	//type container
	$('<div>',{'id':'info-type','class':'infoItem'}).appendTo('#info');
	  //type
	  $('<span>',{'html':'Type: '+info.type}).appendTo('#info-type');
  }

  //if countries
  if(info.hasOwnProperty('stats') && info.stats.hasOwnProperty('country') && info.stats.country.length){
	//type container
	$('<div>',{'id':'info-countries','class':'infoItem'}).appendTo('#info');

	//countries
	var countries = '';

	//for each country
	for(var i=0;i<info.stats.country.length;i++){
	  //add country
	  countries += info.stats.country[i].name;

	  //delimiter
	  countries += (i<(info.stats.country.length-1))?', ':'';
	}

	  //type
	  $('<span>',{'html':'Countries: '+countries}).appendTo('#info-countries');
  }


  //if 'abstract'
  if(info.hasOwnProperty('abstract')){
	//abstract container
	$('<div>',{'id':'info-abstract','class':'infoItem'}).appendTo('#info');
	  //abstract
	  $('<span>',{'html':'Abstract: '+info.abstract}).appendTo('#info-abstract');
  }

  //slide info down
  $('#info').slideDown();

  //set the country
//      tableData.setValue(0, 0, 'United States');
//      tableData.setValue(0, 1, 300);
//
//geomap.setSelection([{row:1,column:null}]);
//console.log(geomap.getSelection());
/*
var view = new google.visualization.DataView(tableData);
view.setRows(view.getFilteredRows([{column: 1, minValue: 700}]));
geomap.draw(view,{sortColumn:1});
//geomap.setSelection(view);
*/
//geomap.draw(tableData,tableConfigOpts);
//drawMap(false);
}