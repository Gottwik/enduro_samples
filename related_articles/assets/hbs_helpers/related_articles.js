var Promise = require('bluebird')

enduro.templating_engine.registerHelper('related_articles', function (options) {

	// store the actual rendered html
	// alternativelly a each helper could be used
	var rendered_html = ''

	// store the promises to read related articles
	var related_article_promises = []

	// go throgh all relate articles and load them
	for (index in this.related_articles) {

		// store the related article
		var related_article = this.related_articles[index]

		// load the actual content of the article
		var related_article_promise = enduro.api.flat.load('/generators/article/' + related_article.related_article_id)
			.then((related_article_context) => {

				// generate the actual html code
				return options.fn(related_article_context)
			})
			.then((rendered_html_block) => {

				// add the html code together with the previous ones
				rendered_html += rendered_html_block
			})

		// add whole thing to a array of promises
		related_article_promises.push(related_article_promise)
	}

	// return whole html block upon reading all related articles
	return Promise.all(related_article_promises)
		.then(() => {
			return rendered_html
		})
})
