function bindings(){
  //bind 'key up' -> search input
  $('#search').keyup(checkInput);

  //bind 'key up' -> author search input
  $('#authsearch').keyup(checkInput);
  
  //bind 'click' -> submit button
  $('#submit').click(sendClick);

  //bind 'click' -> clear button
  $('#clear').click(clearClick);
  
  //bind 'click' -> Resort
  $('#score').click(reSort);

  //bind 'key up' -> return key
//$.bind('keyup',checkInput);
}