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
$(document).on('click', '.article_list_23_tlMainTitle a', function() {
	var _id = $(this).attr('id');
	location.href = '/article/detail?_id=' + _id;
})

$(".header_nav li a").click(function(event) {
	var index = this.title
	var id = '#' + index;
	$("html,body").animate({
		scrollTop: $(id).offset().top
	}, 1000);
	$('.active').removeClass('active');
	$(this).addClass('active');
});
$('.wechat_image').click(function() {
	location.href = '/images/wechat_.png'
})