$(function() {
	var headerHeight = $("#header").outerHeight(true);
	var footerHeight = $("#footer").outerHeight(true);

	$(window).resize(function() {
		var calculatedHeight = $(window).height() - headerHeight - footerHeight;
		var heroTextHeight = $("#heroText").height();
	    $("#heroTextContainer").height((calculatedHeight < heroTextHeight ? heroTextHeight : calculatedHeight));
		return;
	});

	$("#heroTextContainer").height($(window).height() - headerHeight - footerHeight);

	return;
});