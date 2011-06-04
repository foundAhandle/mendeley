function bindings(){
  //bind 'key up' -> search input
  $('#search').keyup(checkInput);
  $('#search').keypress(function(e){
      if(e.which == 13){
       sendClickPage();
       }
  });

  //bind 'key up' -> author search input
  $('#authsearch').keyup(checkInput);
  $('#authsearch').keypress(function(e){
      if(e.which == 13){
       sendClickPage();
       }
  });
  
  //bind 'click' -> submit button
  $('#submit').click(sendClickPage);

  //bind 'click' -> clear button
  $('#clear').click(clearClick);
  
  //bind 'click' -> Resort
  $('#score').click(reSort);

  //bind 'click' -> Next Page of Results
  $('#next').click(nextPageResults);

  //bind 'click' -> Next Page of Results
  $('#previous').click(priorPageResults);
  
  //bind resort to sliders
  $( "#authslider" ).bind( "slidestop", function(event, ui) {
	
	console.log("timer started");
	setTimer();
	timerSort();
	
  });
  
    $( "#pubslider" ).bind( "slidestop", function(event, ui) {
	
	console.log("timer started");
	setTimer();
	timerSort();
	
  });
  
    $( "#titleslider" ).bind( "slidestop", function(event, ui) {
	
	console.log("timer started");
	setTimer();
	timerSort();
	
  });
  
    $( "#slider-range" ).bind( "slidestop", function(event, ui) {
	
	console.log("timer started");
	setTimer();
	timerSort();
	
  });
  
  //bind 'key up' -> return key
//$.bind('keyup',checkInput);
}