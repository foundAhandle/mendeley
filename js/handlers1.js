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
		  $('<a>',{'href':val.mendeley_url,'target':'_blank','html':title}).appendTo('#'+val.uuid);

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
		});

		//fade out the indicator
		$('#spinner1').fadeOut(200);
	  }

	  //toggle score button
	  toggleScore(status!='error');
	});//end load json via api
  });//end fade in loading indicator
}

//function customSort(pAuthor, pPub, pTitle, pYear, pTwitter){
function customSort(){
	$.getJSON(PROXY_URL+SEARCH_PATH+$('#search').val()+'/',CONSUMER_KEY,function(response,status,xhr){
		
		pAuthor = false; 
		pPub = false; 
		pTitle = false; 
		pYear1  = 1995; 
		pYear2  = 2000; 
		pTwitter = false; 
		
		var SearchTerms = $('#search')[0].value;
		SearchTerms = SearchTerms.split(';');
		
		 //Prioritize Author
		 var authorWeight = .5;
		 if (pAuthor ){
			authorWeight = .1;
		 }
		  
		 //Prioritize Publication
		 var pubWeight = 1;
		 if (pPub){
			pubWeight = .1;
		 }
		 
		 //Prioritize Title
		 var titleWeight = .8;
		 if (pTitle ){
			titleWeight = .1;
		 }
		 
		//Filter Year
		console.log(response.documents.length);
	//	for (response.documents, function(key, val) {
		console.log(response.documents.pop().title);
		if (pYear1 != ""){
			for(var i=0, itemSize=response.documents.length; i<itemSize; i++) {
				// console.log(pYear1);
				// console.log("Year 2 = " + pYear2);
				// console.log(response.documents[i].year);
				if (pYear1 <= response.documents[i].year && pYear2 >= response.documents[i].year){
						// console.log("MATCH, i = " +i);
						// console.log("Year Match, length = " + response.documents.length);
						// console.log(response.documents[i].year);
						// console.log(response.documents[i].title);
						// console.log("i = " + i);
						// console.log("itemSize = " + i);
						// console.log("length = " + response.documents.length); 
				}
				else if (response.documents[i].year != undefined) {
					console.log("NO MATCH " + response.documents[i].year);
					response.documents.splice(i,1);
 					console.log("Deleting Item" + i); 
					itemSize = itemSize-1;
					i--;
				};
				console.log("Looping through item:" + i);
			};
			console.log("Year isn't blank" + i);
		};
		 
		$.each(response.documents, function(key, val) {
			var i=key;
			i=i+.1;
			
			var lcAuthors=val.authors.toLowerCase();
			lcAuthors = lcAuthors.replace(/[^\w\s]/g, "");
			
			if (val.publication_outlet != null) {
				var lcPublication=val.publication_outlet.toLowerCase();
				lcPublication = lcPublication.replace(/[^\w\s]/g, "");
			}
			else {
				var lcPublication = "";
			}
			
			var lcTitle=val.title.toLowerCase();
			lcTitle = lcTitle.replace(/[^\w\s]/g, "");
			
			var SLength = SearchTerms.length;
			
			var PaperScore = (i+.1);
			
			while (SLength--) {
				if (lcTitle.indexOf(SearchTerms[SLength]) !== -1) {
					PaperScore = (PaperScore*titleWeight);
				}
				if (lcAuthors.indexOf(SearchTerms[SLength]) !== -1) {
					PaperScore = (PaperScore*authorWeight);
				}
				if (lcPublication.indexOf(SearchTerms[SLength]) !== -1) {
					PaperScore = (PaperScore*pubWeight);
				}
				val.sortOrder = PaperScore;
				
			}
			
			
			
			/* console.log(val.sortOrder);
			console.log(lcAuthors);
			console.log(lcTitle); */
			
		});
		
		function compareDocuments(a, b){
		return a.sortOrder - b.sortOrder;
		}
		response.documents.sort(compareDocuments);
		
		$.each(response.documents, function(key, val) {
			
			console.log(val.sortOrder);
			console.log(val.year);
		});
		//for(var i=0, itemSize=papers.length; i<itemSize; i++) {
	//		console.log(papers.title[0]);
		//}
	});
}