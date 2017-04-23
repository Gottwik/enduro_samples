var Promise = require('bluebird')

enduro.templating_engine.registerHelper('related_articles', function (options) {

	// will store the actual rendered html
	// alternativelly a each helper could be used
	var rendered_html = ''

	// will store the promises to read related articles
	var related_article_promises = []

	for (index in this.related_articles) {

		// will store the related article
		var related_article = this.related_articles[index]

		// will load the actual content of the article
		var related_article_promise = enduro.api.flat.load('/generators/article/' + related_article.related_article_id)
			.then((related_article_context) => {
				return options.fn(related_article_context)
			})
			.then((rendered_html_block) => {
				rendered_html += rendered_html_block
			})

		related_article_promises.push(related_article_promise)
	}

	return Promise.all(related_article_promises)
		.then(() => {
			return rendered_html
		})
})
