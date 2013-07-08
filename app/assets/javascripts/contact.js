function sendForm () {
	$.post("https://deltafunction.wufoo.com/forms/m7x4z5/#public",
		{
			"Field1" : $("#email").val(),
			"Field2" : $("#message").val(),
			"idstamp" : "4NsYQnPPw5AeWEC8BywG+jSakYHCdBjZgDWH2V02EvI="
		}
	).always(function() { window.location = "/"; });
}

$(function() {
	var headerHeight = $("#header").outerHeight(true);
	var footerHeight = $("#footer").outerHeight(true);

	$(window).resize(function() {
		var calculatedHeight = $(window).height() - headerHeight - footerHeight;
		var contactHeight = $("#contactContainer form").height();
	    $("#contactContainer").height((calculatedHeight < contactHeight ? contactHeight : calculatedHeight));
		return;
	});

	$("#contactContainer").height($(window).height() - headerHeight - footerHeight);

	return;
});