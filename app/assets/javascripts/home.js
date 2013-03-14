$(function() {
	var headerHeight = $("#header").outerHeight(true);
	var footerHeight = $("#footer").outerHeight(true);

	$(window).resize(function() {
	    $("#heroTextContainer").height($(window).height() - headerHeight - footerHeight);
		return;
	});

	$("#heroTextContainer").height($(window).height() - headerHeight - footerHeight);

	return;
});



