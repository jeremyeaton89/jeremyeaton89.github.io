$(function(){
	$(".nav a").on("click", function(event){
		$(".nav li").removeClass("active");
		$(event.target).closest("li").addClass("active");
	});
});