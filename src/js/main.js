function scrollTo(elem, event) {
	event.preventDefault();

	var elemTargetId = elem.href.substr(elem.href.indexOf('#'));
	console.log(elemTargetId);
	document.querySelector(elemTargetId).scrollIntoView({
		behavior: 'smooth'
	});
}
