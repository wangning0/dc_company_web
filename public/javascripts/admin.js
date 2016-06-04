var article = avalon.define({
	$id: "adminCtrl",
	allArticle: []
});
var _id = '';
$.ajax({
	url: "/admin/getAll",
	contentType: "application/json",
	type: "GET",
	success: function(data) {
		if (data.status == 0) {
			article.allArticle = data.body;
		} else {
			alert('获取所有文章失败!')
		}
	},
	error: function(err) {
		alert('服务器错误!');
	}
})

//deleteArticle
$(document).on('click', '.deleteArticle', function() {
	console.log(1);
	_id = $(this).attr('id');
	console.log(_id);
})
$(document).on('click', '.deleteArticleSure', function() {
	if (_id) {
		$.ajax({
			url: "/admin/deleteArticle?_id=" + _id,
			type: "GET",
			success: function(data) {
				if (data.status == 0) {
					$('#deleteSuccessModal').modal('show');
				} else {
					alert('删除失败!')
				}
			},
			error: function(err) {
				alert('服务器错误!');
			}
		})
	}
})
$(document).on('click', '.reload', function() {
	location.reload()
})
$(document).on('click', '.modifyArticle', function() {
	location.href = '/modifyArticle?_id=' + $(this).attr('id');
})