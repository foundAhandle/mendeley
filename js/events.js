function bindings(){
  //bind 'key up' -> search input
  $('#search').keyup(checkInput)

  //bind 'click' -> submit button
  $('#submit').click(send)
}