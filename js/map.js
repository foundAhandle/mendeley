//load map
google.load('visualization','1',{'packages':['geomap']});

//set on load callback
google.setOnLoadCallback(initMap);

//initialize map
function initMap(){
  //get a handle on the map element
  mapElement = document.getElementById('map');

  //initialize data table
  tableData = new google.visualization.DataTable();

  //columns
  tableData.addColumn('string','Country');
  tableData.addColumn('number','Popularity');

  //add an empty row to the data table
tableData.addRows(6);

      tableData.setValue(0, 0, 'Germany');
      tableData.setValue(0, 1, 200);
      tableData.setValue(1, 0, 'United States');
      tableData.setValue(1, 1, 300);
      tableData.setValue(2, 0, 'Brazil');
      tableData.setValue(2, 1, 400);
      tableData.setValue(3, 0, 'Canada');
      tableData.setValue(3, 1, 500);
      tableData.setValue(4, 0, 'France');
      tableData.setValue(4, 1, 600);
      tableData.setValue(5, 0, 'RU');
      tableData.setValue(5, 1, 700);

  //data table config options
  tableConfigOpts				= {};
  tableConfigOpts['dataMode']	= 'regions';

  //initialize geo map
  geomap = new google.visualization.GeoMap(mapElement);
}

//draw map
function drawMap(tOrF){
/*
if(tOrF)
tableData = new google.visualization.arrayToDataTable([
['Country','Popularity'],
['Germany',300],
['Brazil',400]
]);
else
tableData = new google.visualization.arrayToDataTable([
['Country','Popularity'],
['Canada',300],
['France',400]
]);
*/
//geomap.getSelection();
//geomap.setSelection([{row:2,column:null}]);
/*
// Create a view that shows everyone hired since 2007.
var view = new google.visualization.DataView(tableData);
view.setRows(view.getFilteredRows([{column: 1, minValue: 400}]));

geomap.draw(view,{sortColumn:1});
*/
  //draw the map
//  geomap.draw(tableData,tableConfigOpts);
  geomap.draw(tableData,{});
/*
google.visualization.drawChart({
      'containerId': 'map',
      'dataTable': tableData,
      'chartType':'GeoMap',
      'options':tableConfigOpts
});
*/
}