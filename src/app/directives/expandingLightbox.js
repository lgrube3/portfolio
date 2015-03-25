app.directive('expandingLightbox', function() {
  return {
    restrict: 'E',
    scope: {
      hide: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.hideModal = function() {
        return scope.hide = true;
      };
      /*scope.$watch('hide', function(newVal, oldVal) {
        if (!newVal && oldVal) {
          document.getElementsByTagName("body")[0].style.overflow = "hidden";
        } else {
          setTimeout(function(){ document.getElementsByTagName("body")[0].style.overflow = ""; }, 800);
        }
      });*/
    },
    templateUrl: 'assets/views/modalTemplate.html'

  };
});