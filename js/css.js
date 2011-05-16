//css updates after dom load
function updateCss(){
  //corners not working properly if height is set via css
  $('#outer').css({'height':120});

  //round corners
  $('#outer').corners('15px');
}