//css updates after dom load
function updateCss(){
  //corners not working properly if height is set via css
  $('#container').css({'height':120});

  //round corners
  $('#container').corners('15px');
}