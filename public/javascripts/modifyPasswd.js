$('.modifySubmit').click(function() {
	var passwd = $('#password').val();
	var repasswd = $('#repassword').val();
	console.log(passwd, repasswd);
	if (passwd == repasswd) {
		var data = {
			passwd: passwd
		}
		$.ajax({
			url: '/modifyPasswd',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: function(data) {
				if (data.status == 0) {
					alert('密码修改成功!');
					location.href = '/admin/login'
				} else {
					alert('密码修改失败!')
				}
			},
			error: function(err) {
				if (err) {
					alert('服务器错误!');
				}
			}
		})
	} else {
		alert('两次密码输入不相同!')
	}
})