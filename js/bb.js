const breakpoints = {
	'sm': 568,
	'md': 768,
	'lg': 1024,
	'xl': 1280
}

// General UI elements
let bbUISquare = $('.bb-ui-square');
let bbUIFill = $('.bb-ui-fill');

// Unique UI elements
let bbUIFull = $('#bb-ui-full');
let bbUIBottom = $('#bb-ui-bottom');

function renderDimensions() {
	let width = $(window).width();
	let height = $(window).height();

	if(width < breakpoints.md) {
		var heightOverride = true;
	}
	if(width >= breakpoints.lg) {
		// Set content card height to full
		bbUIFull.height(height);
	}

	bbUISquare.each(function() {
		let that = $(this);
		if(heightOverride) {
			that.css('height', '');
		}
		else {
			that.css('height', that.width());
		}
	});
	bbUIFill.each(function() {
		let that = $(this);
		if(heightOverride) {
			that.css('height', '');
		}
		else {
			that.css('height', height - bbUIBottom.height());
		}
	});
}

$(document).ready(function() {
	renderDimensions();
});

$(window).resize(function() {
	renderDimensions();
});