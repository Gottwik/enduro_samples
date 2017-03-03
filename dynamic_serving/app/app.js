var local_app = function () {}

local_app.prototype.init = function (app) {
	app.get('/random', function (req, res) {
		enduro.api.temper.render('random', { random_number: Math.random() })
			.then((output) => {
				res.send(output)
			})
	})
}

module.exports = new local_app()
