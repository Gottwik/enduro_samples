var local_app = function () {}

// * ———————————————————————————————————————————————————————— * //
// * 	init
// *
// *	gets called upon starting enduro.js production server
// *	@param {express app} app - express app
// *	@return {nothing}
// * ———————————————————————————————————————————————————————— * //
local_app.prototype.init = function (app) {
	// express app available here
	// don't forget these routes will be available on production server server (defaults to localhost:5000)

	app.get('/submit_feedback', (req, res) => {

		// just assume everything that came is a feedback
		const new_feedback = req.query

		// upsert will add to the feedback, given the feedback is an array
		enduro.api.flat.upsert('global/feedback', { feedback: [new_feedback] })
			.then(() => {

				res.send()
			})
	})
}

module.exports = new local_app()
