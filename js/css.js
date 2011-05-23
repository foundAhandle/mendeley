//css updates after dom load
function updateCss(){
  //corners not working properly if height is set via css
  $('#top').css({'height':120});

  //round corners
  $('#top').corners('15px');
}