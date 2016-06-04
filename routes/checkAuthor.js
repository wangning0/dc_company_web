module.exports = function(req, res) {
	if (!req.session.username) {
		res.redirect('/admin/login');
	}
}