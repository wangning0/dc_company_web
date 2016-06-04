$.ajax({
	url: '/admin/getOneArticle?_id=' + getUrlParam('_id'),
	type: 'GET',
	success: function(data) {
		console.log(data);
		if (data.status == 0) {
			$('.container_body').html(data.body[0].article);
			$('.title').html(data.body[0].title);
			$('.author').html(data.body[0].author);
			$('.time').html(data.body[0].time);
		} else {
			alert('获取文章数据失败!')
		}
	},
	error: function() {
		alert('服务器出错!')
	}
})


function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}