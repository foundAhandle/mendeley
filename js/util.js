//clear screen
function clear(clearAll){
  //if search input and hiding spinner
  if(clearAll){
	//clear search input
	$('#search').val('');

	//hide submit button
	toggleSubmit(false);

	//hide submit spinner
	$('#spinner1').hide();

	//hide score spinner
	$('#spinner2').hide();
  }

//CLEAR MAP


  //hide score button
  toggleScore(false);

  //remove all results
  $('#results').children().remove();
}