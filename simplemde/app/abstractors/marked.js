/* eslint { no-undef: 2, no-empty-function: 1} */
/* global enduro */

var additional_cultures = []

// placeholder abstractor
var abstractor = function () {}

// vendor dependencies
var marked = require('marked')
var renderer = new marked.Renderer()
renderer.heading = function (text, level) {
	var patt = /\s?{([^}]+)}$/
	var link = patt.exec(text)

	if (link && link.length && link[1]) {
		text = text.replace(patt, '')
		link = link[1]
	} else {
		link = text.toLowerCase().replace(/[^\wА-яіІїЇєЄ]+/gi, '-')
	}
	return '<h' + level + ' id="' + link + '">' + text + '</h' + level + '>'
}
marked.setOptions({
	renderer,
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: true,
	sanitize: false,
	smartLists: true,
	smartypants: false
})

abstractor.prototype.init = function (context) {
	// initialize abstractor
	return new Promise(function (resolve, reject) {
		enduro.api.flat.load('./config/babel')
		.then(data => {
			if ('cultures' in data) {
				additional_cultures = data.cultures.slice(1)
			}
			resolve()
		})
	})
}

abstractor.prototype.abstract = function (context) {
	return new Promise(function (resolve, reject) {

		// hides the abstracted context
		context.$abstracted_content_hidden = true

		// creates abstracted context object
		context.abstracted_content = {}

		// creates the markdowned context
		context.abstracted_content.marked_marked = marked(context.marked).replace(/(\s[а-яА-ЯёЁ]{1,2})\s/g, '$1 ')

		// creates folder structure
		var headings = context.abstracted_content.marked_marked.match(/<h[{1-3}] id=".*?">.*?\/h[{1-3}]>/g)
		var heading_structure = []
		for (const m in headings) {
			var heading = {}
			var heading_match = headings[m].match(/<h([{1-3}]) id="(.*?)">(.*)?<\/h[{1-3}]>/)
			heading.heading = heading_match[3]
			heading.level = heading_match[1]
			heading.link = heading_match[2]
			heading_structure.push(heading)
		}
		context.abstracted_content.contents = heading_structure

		// run the same code on all translations
		for (const i in additional_cultures) {
			if (('$marked_' + additional_cultures[i]) in context) {
				context.abstracted_content['$marked_marked_' + additional_cultures[i]] =
					marked(context['$marked_' + additional_cultures[i]])
				const headings = context.abstracted_content['$marked_marked_' + additional_cultures[i]]
					.match(/<h[{1-3}] id=".*?">.*?\/h[{1-3}]>/g)
				const heading_structure = []
				for (const m in headings) {
					const heading = {}
					const heading_match = headings[m].match(/<h([{1-3}]) id="(.*?)">(.*)?<\/h[{1-3}]>/)
					heading.heading = heading_match[3]
					heading.level = heading_match[1]
					heading.link = heading_match[2]
					heading_structure.push(heading)
				}
				context.abstracted_content['$contents_' + additional_cultures[i]] = heading_structure
			}
		}

		// abstract directive
		return resolve()
	})
}

module.exports = new abstractor()
