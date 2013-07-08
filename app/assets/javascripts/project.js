function hideNotification() {
	$(this).fadeOut();
}

$(function() {
	$(".notification").click(hideNotification);

	var headerHeight = $("#header").outerHeight(true);
	var footerHeight = $("#footer").outerHeight(true);
	var titleHeight = $(".projectHeader").outerHeight();
	var detailsLeftHeight =  $("#detailsLeft").outerHeight(true);
	var windowHeight = $(window).height();
	var containerHeight = headerHeight + footerHeight + titleHeight + detailsLeftHeight < windowHeight ?
		windowHeight - headerHeight - footerHeight : titleHeight + detailsLeftHeight;
	$(".projectContainer").height(containerHeight);

	$(window).resize(function() {
		var headerHeight = $("#header").outerHeight(true);
		var footerHeight = $("#footer").outerHeight(true);
		var titleHeight = $(".projectHeader").outerHeight();
		var detailsLeftHeight =  $("#detailsLeft").outerHeight(true);
		var windowHeight = $(window).height();
		var containerHeight = headerHeight + footerHeight + titleHeight + detailsLeftHeight < windowHeight ?
			windowHeight - headerHeight - footerHeight : titleHeight + detailsLeftHeight;
		$(".projectContainer").height(containerHeight);
		return;
	});
});