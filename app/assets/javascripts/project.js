function hideNotification() {
	$(this).fadeOut();
}

$(function() {
	$(".notification").click(hideNotification);
});