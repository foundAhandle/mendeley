//check input
function checkInput(){
  //if the search input is blank
	var SearchString = $('#search').val();
	var authSearchString = $('#authsearch').val();
	var comboSearchString = SearchString + ";" + authSearchString;  
	//console.log(comboSearchString);
  if(SearchString=='' && authSearchString==''){
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
	
	if(SearchString !="" && authSearchString !=""){
		var validOrNot = rE.test(comboSearchString);
		//console.log("neither blank");
	}
	else if (SearchString == "") {
		var validOrNot = rE.test(authSearchString);
		//console.log("paper blank, author not");
	}
	else{
		var validOrNot = rE.test(SearchString);
		//console.log("author blank, paper not");
	}
	//set message
	toggleMessage(validOrNot);

	//set submit button visibility
	toggleSubmit(validOrNot);

	//score button is hidden
	toggleScore(validOrNot);
  }
}

//send click
function sendClick(){
	//clear previous results
	clear(false);

	//call send with proper url and utility function

	var SearchString = $('#search').val();
	var authSearchString = $('#authsearch').val();
	var comboSearchString = authSearchString + ";" + SearchString;
	console.log(comboSearchString);
	if (SearchString != "" && authSearchString != "") {
		send(PROXY_URL+SEARCH_PATH+comboSearchString+'/',CONSUMER_KEY,populate);
	console.log("It's a 1!");
	}
	else if (authSearchString === "") {
	console.log("It's a 2!");
		send(PROXY_URL+SEARCH_PATH+$('#search').val()+'/',CONSUMER_KEY,populate);
	}
	else {
		send(PROXY_URL+AUTHSEARCH_PATH+$('#authsearch').val()+'/',CONSUMER_KEY,populate);
		console.log("It's a 3!");
	}

}

//clear click
function clearClick(){
  //clear previous results
  clear(true);
}

//mouse over handler
function over(){
  //set the country
//console.log(tableData);
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

//mouse out handler
function out(){
  //
console.log('out');
};


//function customSort(pAuthor, pPub, pTitle, pYear, pTwitter){
function customSort(response){
//	$.getJSON(PROXY_URL+SEARCH_PATH+$('#search').val()+'/',CONSUMER_KEY,function(response,status,xhr){
		
		authorWeight = $( "#authslider" ).slider( "values", 1 ); 
		authorWeight = Math.abs(authorWeight-100)+1;
		titleWeight =  $( "#titleslider" ).slider( "values", 1 ); 
		titleWeight = Math.abs(titleWeight-100)+1;
		pubWeight = $( "#pubslider" ).slider( "values", 1 ); 
		pubWeight = Math.abs(pubWeight-100)+1;
		pYear1 = $( "#slider-range" ).slider( "values", 0 );
		pYear2 = $( "#slider-range" ).slider( "values", 1 );
		console.log("Author Weight = " + authorWeight);
		console.log("Title Weight = " + titleWeight);
		console.log("Publication Weight = " + pubWeight);
	
		var sortedResponse = response;
		
		var SearchTerms = $('#search')[0].value;
		SearchTerms = SearchTerms.split(';');
		
		 //Prioritize Author
		 /* var authorWeight = .5;
		 if (pAuthor ){
			authorWeight = .1;
		 } */
		  
		 //Prioritize Publication
		/*  var pubWeight = 1;
		 if (pPub){
			pubWeight = .1;
		 } */
		 
		 //Prioritize Title
		/*  var titleWeight = .8;
		 if (pTitle ){
			titleWeight = .1;
		 } */
		 
		//Filter Year
		
	//	for (sortedResponse.documents, function(key, val) {
		console.log(sortedResponse.documents.pop().title);
		if (pYear1 != ""){
			for(var i=0, itemSize=sortedResponse.documents.length; i<itemSize; i++) {
				// console.log(pYear1);
				// console.log("Year 2 = " + pYear2);
				// console.log(sortedResponse.documents[i].year);
				if (pYear1 <= sortedResponse.documents[i].year && pYear2 >= sortedResponse.documents[i].year){
						// console.log("MATCH, i = " +i);
						// console.log("Year Match, length = " + sortedResponse.documents.length);
						// console.log(sortedResponse.documents[i].year);
						// console.log(sortedResponse.documents[i].title);
						// console.log("i = " + i);
						// console.log("itemSize = " + i);
						// console.log("length = " + sortedResponse.documents.length); 
				}
				else if (sortedResponse.documents[i].year != undefined) {
					console.log("NO MATCH " + sortedResponse.documents[i].year);
					sortedResponse.documents.splice(i,1);
 					console.log("Deleting Item" + i); 
					itemSize = itemSize-1;
					i--;
				};
				console.log("Looping through item:" + i);
			};
			console.log("Year isn't blank" + i);
		};
		 
		$.each(sortedResponse.documents, function(key, val) {
			var i=key;
			i=i+.1;
			
			if (val.authors != null) {
				var lcAuthors=val.authors.toLowerCase();
				lcAuthors = lcAuthors.replace(/[^\w\s]/g, "");
			}
			else {
				var lcAuthors = "";
			}
			
			if (val.publication_outlet != null) {
				var lcPublication=val.publication_outlet.toLowerCase();
				lcPublication = lcPublication.replace(/[^\w\s]/g, "");
			}
			else {
				var lcPublication = "";
			}
			
			if (val.title != null) {
				var lcTitle=val.title.toLowerCase();
				lcTitle = lcTitle.replace(/[^\w\s]/g, "");
			}
			else {
				var lcTitle = "";
			}
			
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
		sortedResponse.documents.sort(compareDocuments);
		
		$.each(sortedResponse.documents, function(key, val) {
			
			console.log(val.sortOrder);
			console.log(val.year);
		});
//	});
}

function reSort(){
	storeResponse = jQuery.extend(true, {}, originalResponse);
	customSort(storeResponse);
	$('#results').children().remove();
	populate(storeResponse);
}

function displaySliders(){
	
	$(function() {
		$( "#slider-range" ).slider({
			range: true,
			min: 1900,
			max: 2011,
			values: [ 1950, 2011 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			}
		
		});

		$( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) +	" - " + $( "#slider-range" ).slider( "values", 1 ) );
	});
	
/*  	$(function() {
		// setup search option sliders
		$( "#searchSliders > span" ).each(function() {
			// read initial values from markup and remove that
			//var value = parseInt( $( this ).text(), 10 );
			$( this ).empty().slider({
				value: 10,
				range: "min",
				animate: true,
				orientation: "vertical"
			});
		});
	});  */
	
	
}

function displayAuthorSlider(){

	$(function() {
		$( "#authslider" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			slide: function( event, ui ) {
				$( "#authorPriority" ).val( ui.value );
			}
		});
		$( "#authorPriority" ).val( $( "#authslider" ).slider( "value" ) );
	}); 
	

}

function displayTitleSlider(){

	$(function() {
		$( "#titleslider" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,

			value: 60,
			slide: function( event, ui ) {
				$( "#titlePriority" ).val( ui.value );
			}
		});
		$( "#titlePriority" ).val( $( "#titleslider" ).slider( "value" ) );
	}); 
	

}
function displayPublicationSlider(){

	$(function() {
		$( "#pubslider" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			slide: function( event, ui ) {
				$( "#pubPriority" ).val( ui.value );
			}
		});
		$( "#pubPriority" ).val( $( "#pubslider" ).slider( "value" ) );
	}); 
	

}