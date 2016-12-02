var BREAKPOINT = 1024;

var isSwapped = false;
var techlaSwap = [document.getElementById('techla-1'), document.getElementById('techla-2')];

// Helper functions
getViewportWidth = function() {
	return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
};

swapElementInnerHTML = function(elemRefA, elemRefB) {
	var temp = elemRefA.innerHTML;
	elemRefA.innerHTML = elemRefB.innerHTML;
	elemRefB.innerHTML = temp;
};

scrollTo = function(elem, event) {
	event.preventDefault();

	var elemTargetId = elem.href.substr(elem.href.indexOf('#'));
	console.log(elemTargetId);
	document.querySelector(elemTargetId).scrollIntoView({
		behavior: 'smooth'
	});
};

// Primary functions
(function() {
	if(getViewportWidth() < BREAKPOINT) {
		swapElementInnerHTML(techlaSwap[0], techlaSwap[1]);
		isSwapped = !isSwapped;
	}
})();

window.onresize = function() {	
	if((getViewportWidth() < BREAKPOINT && !isSwapped) || (getViewportWidth() >= BREAKPOINT && isSwapped)) {
		swapElementInnerHTML(techlaSwap[0], techlaSwap[1]);
		isSwapped = !isSwapped;
	}
};