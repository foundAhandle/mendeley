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
}