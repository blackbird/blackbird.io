function scrollTo(elemId, event) {
	event.preventDefault();
	document.querySelector('#' + elemId).scrollIntoView({
		behavior: 'smooth'
	});
}
