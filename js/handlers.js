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

//send click
function sendClick(){
  //clear previous results
  clear(false);

  //call send with proper url and utility function
  send(PROXY_URL+SEARCH_PATH+$('#search').val()+'/',CONSUMER_KEY,populate);
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
		
		pAuthor = false; 
		pPub = false; 
		pTitle = false; 
		pYear1 = $( "#slider-range" ).slider( "values", 0 );
		pYear2 = $( "#slider-range" ).slider( "values", 1 );
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
//	});
}

function reSort(){
	customSort(storeResponse);
	$('#results').children().remove();
	populate(storeResponse);
}

function displayYearSlider(){
	
	//$('.yearSlider').append('<div id="slider-range">	</div>');	
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
		// startYear = $( "#slider-range" ).slider( "values", 0 );
		// endYear = $( "#slider-range" ).slider( "values", 1 );
		//console.log("end year =" + endYear);
	});
				
	
}
