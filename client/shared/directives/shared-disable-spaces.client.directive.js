(() => {
	'use strict';
	
	angular
		.module('shared')
		.directive('disableSpaces', disableSpaces);

	function disableSpaces () {

		const directive = {
			restrict: 'A',
			link: link
		}

		function link ($scope, $element) {
	      $element.bind('keydown', function(e) {
                if (e.which === 32) {	// disable typing space
                    e.preventDefault();
                }
            });
	    }

		return directive;
	}

})();