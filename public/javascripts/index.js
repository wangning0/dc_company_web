var IndexVM = avalon.define({
	$id: 'article',
	article: {}
})
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
$.ajax({
	url: "/admin/getAllByYear",
	contentType: 'application/json',
	type: 'GET',
	success: function(data) {
		if (data.status == 0) {
			IndexVM.article = data.body;
		} else {
			alert('获取文章出错!');
		}
	},
	errod: function(err) {
		alert('服务器错误!');
	}
})