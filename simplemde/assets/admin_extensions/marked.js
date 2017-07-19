// * ———————————————————————————————————————————————————————— * //
// * 	markdown directives for SimpleMDE
// * ———————————————————————————————————————————————————————— * //

$.ajaxSetup({
	cache: true
})

// inject SimpleMDE's css into the admin interface
$('head')
.append('<link rel="stylesheet" type="text/css" href="/assets/vendor/simplemde/dist/simplemde.min.css">')
.append(`
	<style>
		.control-simplemde .CodeMirror {
			max-height: 30rem;
		}
	</style>
`)

enduro_admin_app.compileProvider
	.directive('marked', function () {
		return {
			link: function (scope, element, attrs) {
				$.getScript('/assets/vendor/simplemde/dist/simplemde.min.js', function () {
					var options = {
						element: element[0],
						spellChecker: false
					}
					var mde = new SimpleMDE(options)
					mde.codemirror.on('change', function () {
						scope.context[scope.terminatedkey] = mde.value()
					})
					scope.simplemde = {
						instance: mde
					}
					scope.$watch('current_culture', function () {
						mde.value(scope.context[scope.terminatedkey] || '')
					})
				})
			}
		}
	}
)
