// TODO: save state before submission, then deleting it only upon success in receiving page

function saveData() {
	var title = $("#title").val();
	var year = $("#year").val();
	var shortDescription = $("#shortDescription").val();
	var longDescription = $("#longDescription").val();
	var technologies = $("#technologies").val();
	
	localStorage.setItem("title", title);
	localStorage.setItem("year", year);
	localStorage.setItem("shortDescription", shortDescription);
	localStorage.setItem("longDescription", longDescription);
	localStorage.setItem("technologies", technologies);
}

function retrieveData(){
	var title = localStorage.getItem("title");
	document.querySelector("#title").value = title;
	var year = localStorage.getItem("year");
	document.querySelector("#year").value = year;
	var shortDescription = localStorage.getItem("shortDescription");
	document.querySelector("#shortDescription").value = shortDescription;
	var longDescription = localStorage.getItem("longDescription");
	document.querySelector("#longDescription").value = longDescription;
	var technologies = localStorage.getItem("technologies");
	document.querySelector("#technologies").value = technologies;
}

function removeData() {
	localStorage.removeItem("title");	// XXX this method DNE
	localStorage.removeItem("year");
	localStorage.removeItem("shortDescription");
	localStorage.removeItem("longDescription");
	localStorage.removeItem("technologies");
}

function sendNewProject() {
	console.log("does nothing.");
}

$(function(){
	retrieveData();
	
	var myInterval = setInterval(saveData, 5000);
	$("input[type='reset']").click(removeData);
	$("input[type='submit']").click(removeData);
});