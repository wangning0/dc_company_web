$(function() {
	$('.index').click(function() {
		console.log($(window).width());
		if ($(window).width() <= 715) {
			$('.header_nav ul div').toggle();
		}
	})
	$(window).on('resize', function() {
		if ($(window).width() > 715) {
			$('.header_nav ul div').css('display', 'block');
		} else {
			$('.header_nav ul div').css('display', 'none');
		}
	})
})