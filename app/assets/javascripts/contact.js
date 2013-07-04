function sendForm () {
	$.post("https://deltafunction.wufoo.com/forms/m7x4z5/#public",
		{
			"Field1" : $("#email").val(),
			"Field2" : $("#message").val(),
			"idstamp" : "4NsYQnPPw5AeWEC8BywG+jSakYHCdBjZgDWH2V02EvI="
		}
	).always(function() { window.location = "/"; });
}