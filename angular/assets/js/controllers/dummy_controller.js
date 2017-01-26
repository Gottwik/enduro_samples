// * ———————————————————————————————————————————————————————— * //
// * 	dummy controller
// * ———————————————————————————————————————————————————————— * //
endurojs_angular_app.controller('dummy_controller', function ($scope, $interval) {

	$scope.seconds = 0

	$interval(function () {
		$scope.seconds++
	}, 100)

})
