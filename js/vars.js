//proxy url
var PROXY_URL	 = 'http://collabracode-js.appspot.com/mendeley_proxy/';

//search api url
var SEARCH_PATH	 = 'oapi/documents/search/';

//search api url
var AUTHSEARCH_PATH	 = 'oapi/documents/authored/';

//consumer key
var CONSUMER_KEY = 'consumer_key=973a9d58c1f8ffe7155e5d5136183ff304dcb3fb6&items=100';

//search input regex
var SEARCH_REGEX = '^(\\s|\\w|;|-|\\$|\\(|\\))+$';

//response data
var storeResponse = []; 
var originalResponse = []; 

//start year
var startYear = 0;

//end year
var endYear = 0;

//google map
//var mapElement, geomap, tableData, tableConfigOpts;