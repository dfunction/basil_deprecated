function resizeProjectTiles(tileSize, childrenCount) {
	var projectTilesWidth = tileSize * Math.floor((($(window).width() < 960 ? 960 : $(window).width()) - 100) / tileSize);
	$("#projectTiles").stop().animate({width : projectTilesWidth}, 500);
	return;
};

$(function() {
	var headerHeight = $("#header").outerHeight(true);
	var footerHeight = $("#footer").outerHeight(true);
	var timeout;
	var childrenCount = $("#projectTiles").children().size();
	var tileSize = 250;

	$("#projectTiles").width(tileSize * Math.floor(($(window).width() - 50) / tileSize));

	$(window).resize(function() {

		// Preserve width structure
	    clearTimeout(timeout);
	    timeout = setTimeout(function() {
	        resizeProjectTiles(tileSize, childrenCount);
	    }, 100);
	});

	return;
});
