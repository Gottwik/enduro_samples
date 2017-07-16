// inject pell into the admin interface
// var script = document.createElement('script')
// script.setAttribute('src', 'https://unpkg.com/pell')
// script.setAttribute('type', 'text/javascript')
// document.getElementsByTagName('head')[0].appendChild(script)

$.ajaxSetup({
    cache: true
})

// inject pell's css into the admin interface
$('head').append('<link rel="stylesheet" type="text/css" href="https://unpkg.com/pell/dist/pell.min.css">')

// * ———————————————————————————————————————————————————————— * //
// *	custom wysiwyg directive
// * ———————————————————————————————————————————————————————— * //
enduro_admin_app.compileProvider
	.directive('wysiwyg', function () {
		return {
			link: function (scope, element, attr) {
				$.getScript('https://unpkg.com/pell', function () {
					var current_content = window.pell.init({
						element: element[0],
						onChange: function (html) {
							scope.context[scope.terminatedkey] = html
						}
					})

					current_content.content.innerHTML = scope.context[scope.terminatedkey]
				})
			}
		}
	})
