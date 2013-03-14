function resizeProjectTiles(childSize, childrenCount) {
	var projectTilesWidth = childSize * Math.floor(($(window).width() - 100) / childSize);
	$("#projectTiles").stop().animate({width : projectTilesWidth}, 500);
	return;
};

$(function() {
	var timeout;
	var childrenCount = $("#projectTiles").children().size();
	var childSize = 250;

	$("#projectTiles").width(childSize * Math.floor(($(window).width() - 50) / childSize));

	$(window).resize(function() {
	    clearTimeout(timeout);
	    timeout = setTimeout(function() {
	        resizeProjectTiles(childSize, childrenCount);
	    }, 100);
	});

	return;
});
