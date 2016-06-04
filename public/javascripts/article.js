 var ue = UE.getEditor('editor');

 $(document).on('click', '.submit_article', function() {
     var articleInfo = {};
     articleInfo.title = $('#title').val();
     articleInfo.time = $('#time').val();
     articleInfo.article = getContent();
     articleInfo.author = $('#author').val();
     console.log(articleInfo);
     $.ajax({
         url: '/admin/article',
         contentType: 'application/json',
         type: 'POST',
         data: JSON.stringify(articleInfo),
         success: function(data) {
             if (data.status == 0) {
                 alert('发表文章成功');
                 location.href = '/admin/index';
             } else {
                 alert('文章上传失败');
             }
         },
         error: function(err) {
             alert('服务器错误!')
         }
     })
 })
 $(document).on('click', '.modify_article', function() {
     var articleInfo = {};
     articleInfo._id = getUrlParam('_id');
     articleInfo.title = $('#title').val();
     articleInfo.time = $('#time').val();
     articleInfo.article = getContent();
     articleInfo.author = $('#author').val();
     console.log(articleInfo);
     $.ajax({
         url: '/admin/modifyArticle',
         contentType: 'application/json',
         type: 'POST',
         data: JSON.stringify(articleInfo),
         success: function(data) {
             if (data.status == 0) {
                 alert('更新文章成功');
                 location.href = '/admin/index';
             } else {
                 alert('更新文章失败');
             }
         },
         error: function(err) {
             alert('服务器错误!')
         }
     })
 })
 if (getUrlParam('_id')) {
     $.ajax({
         url: '/admin/getOneArticle?_id=' + getUrlParam('_id'),
         type: 'GET',
         success: function(data) {
             if (data.status == 0) {
                 $('#title').val(data.body[0].title);
                 $('#time').val(data.body[0].time);
                 $('#author').val(data.body[0].author);
                 UE.getEditor('editor').addListener("ready", function() {
                     // editor准备好之后才可以使用
                     UE.getEditor('editor').setContent(data.body[0].article);

                 });

             } else {
                 alert('获取文章失败!')
             }
         },
         error: function(err) {
             alert('服务器错误!');
         }
     })
 }

 function getContent() {
     return UE.getEditor('editor').getContent();
 }

 function setContent(content, isAppendTo) {
     UE.getEditor('editor').setContent(content, isAppendTo);
 }
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
