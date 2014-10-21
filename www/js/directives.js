(function (window, angular, undefined) {

	angular.module ('Trabajando.com')

		/**
		 * Range Input
		 */
		.directive ('range', function () {
			return {
				restrict: 	'A',
				require: 	'ngModel',
				scope: 		{},
				link: 		function ($scope, element, attrs, ngModel) {
					ngModel.$parsers.push (function (val) {
						return parseInt (val);
					});
				}
			};
		})

	;

})(window, angular);