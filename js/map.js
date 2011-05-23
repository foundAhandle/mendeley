//load map
google.load('visualization','1',{'packages':['geomap']});
//google.setOnLoadCallback(drawMap);

//draw map
function drawMap(){
  var data = new google.visualization.DataTable();
  data.addRows(6);
  data.addColumn('string','Country');
  data.addColumn('number','Popularity');
  data.setValue(0,0,'Germany');
  data.setValue(0,1,200);
  data.setValue(1,0,'United States');
  data.setValue(1,1,300);
  data.setValue(2,0,'Brazil');
  data.setValue(2,1,400);
  data.setValue(3,0,'Canada');
  data.setValue(3,1,500);
  data.setValue(4,0,'France');
  data.setValue(4,1,600);
  data.setValue(5,0,'RU');
  data.setValue(5,1,700);

  var options = {};
  options['dataMode'] = 'regions';

  var container = document.getElementById('map');
  var geomap = new google.visualization.GeoMap(container);
  geomap.draw(data,options);
}