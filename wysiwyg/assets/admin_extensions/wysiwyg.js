// all js files in admin_extensions folder will be injected into the admin interface

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

					scope.$watch('current_culture', function () {
						current_content.content.innerHTML = scope.context[scope.terminatedkey] || ''
					})

					current_content.content.innerHTML = scope.context[scope.terminatedkey]
				})
			}
		}
	})
