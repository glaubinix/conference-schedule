function PageBuilder() {

}

PageBuilder.prototype.setConferenceTitle = function(title) {
	document.getElementsByTagName('title')[0].innerText = title;
	document.getElementById('headline').innerHTML = title;
}
