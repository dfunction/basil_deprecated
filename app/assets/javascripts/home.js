$(function() {
	var headerHeight = $("#header").outerHeight(true);
	var footerHeight = $("#footer").outerHeight(true);

	$(window).resize(function() {
		var calculatedHeight = $(window).height() - headerHeight - footerHeight;
	    $("#heroTextContainer").height((calculatedHeight < $("#heroText").height() ? $("#heroText").height() : calculatedHeight));
		return;
	});

	$("#heroTextContainer").height($(window).height() - headerHeight - footerHeight);

	return;
});