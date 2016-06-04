$(function(){

	$('#under>li>a').mouseenter(function(){
		$(this).addClass('underline');
	}).mouseleave(function(){
		$(this).removeClass('underline');
	});

})
