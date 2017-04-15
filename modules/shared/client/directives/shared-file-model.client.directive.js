(() => {
    'use strict';
    
    angular
        .module('shared')
        .directive('fileModel', fileModel);

    fileModel.$inject = ['$parse'];

    function fileModel ($parse) {

        const directive = {
            restrict: 'A',
            link: link
        }

        function link(scope, element, attrs){
            const model = $parse(attrs.fileModel);
            const modelSetter = model.assign;

            element.bind('change', () => {
                scope.$apply(function(){
                    modelSetter(scope, element[0].files);
                });
            });
        }

        return directive;
    }

})();

