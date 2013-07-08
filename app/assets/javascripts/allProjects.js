function resizeProjectTilesContainer(tileSize, childrenCount) {
	// set width
	var projectTilesWidth = tileSize * Math.floor((($(window).width() < 960 ? 960 : $(window).width()) - 100) / tileSize);
	$("#projectTilesContainer").stop().animate({width : projectTilesWidth}, 500);

	// set height
	var footerHeight = $("#footer").outerHeight(true);
	var tilesHeight = tileSize * (Math.ceil(childrenCount / (Math.floor(($(window).width() - 50) / tileSize))));
	var containerMarginTop = parseInt($("#projectTilesContainer").css("margin-top"));
	var windowHeight = $(window).height();
	var projectTilesHeight = tilesHeight + footerHeight + containerMarginTop < windowHeight ?
		windowHeight - footerHeight - containerMarginTop : tilesHeight;
	$("#projectTilesContainer").animate({height : projectTilesHeight}, 500);

	return;
};

$(function() {
	var headerHeight = $("#header").outerHeight(true);
	var footerHeight = $("#footer").outerHeight(true);
	var timeout;
	var childrenCount = $("#projectTilesContainer").children().size();
	var tileSize = 250;

	// set width
	$("#projectTilesContainer").width(tileSize * Math.floor(($(window).width() - 50) / tileSize));

	// set height
	var tilesHeight = tileSize * (Math.ceil(childrenCount / (Math.floor(($(window).width() - 50) / tileSize))));
	var containerMarginTop = parseInt($("#projectTilesContainer").css("margin-top"));
	var windowHeight = $(window).height();
	var projectTilesHeight = tilesHeight + footerHeight + containerMarginTop < windowHeight ?
		windowHeight - footerHeight - containerMarginTop : tilesHeight;
	$("#projectTilesContainer").height(projectTilesHeight);

	$(window).resize(function() {
		// Preserve width structure
	    clearTimeout(timeout);
	    timeout = setTimeout(function() {
	        resizeProjectTilesContainer(tileSize, childrenCount);
	    }, 100);
	});

	return;
});