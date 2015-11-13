var weatherApp  = angular.module('weatherApp', [])
.controller('wheatherAppController', ['$scope', function($scope) {


    $scope.weatherHeader= "WHEATHER APP";
    $scope.addNew = "Add new";
    $scope.search = "Search from list";
   
    $scope.jsonArray = [
    ];
    
    $scope.keyup = function(){
        console.log('keyup');
    }
    
    $scope.doSomething=function(){
        console.log('entered');
    $scope.entered = "yes";
    };
    
    $scope.addNewToNgRepeat = function (array, index){
 
        $scope.jsonArray.push({
            value: $scope.newInputValue
        });
    
        $scope.newInputValue = "";
    };
    
    $scope.removeFromList = function (jsonArray, index){
        //delete $scope.jsonArray[index];
        try{
            console.log(index + " " + jsonArray(index))
        jsonArray.splice(index, 1);
        }catch(Exception){
            console.log(Exception);
        }
    };
    
}])
    
  
.filter('reverse', function() {
    return function(jsonArray) {
        return jsonArray.slice().reverse();
    };
  })
  
  .directive('onEnter', function() {
   return {
       restrict: 'A',
        scope: {
           onEnter: '&'
          },
    link: function(scope, element) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
         console.log('enter pressed...!!!!!');
         scope.onEnter();
         scope.$apply();
        }
      });
    }
  }
});