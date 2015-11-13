var weatherApp  = angular.module('weatherApp', []);
weatherApp.controller('weatherAppController', ['$scope', '$http', function($scope, $http) {


    $scope.weatherHeader= "WEATHER APP";
    $scope.infoText = ""
          
    $scope.weatherArray = [
    ];
    
    $scope.currentconditions = [
    ];
    
    $scope.choose = "Select city" ;
    $scope.clearList = "Clear list";
    $scope.showClearListButton = false;
    
    /*hardcoded list of cities could be selected*/
    $scope.data = {
    citySelect: null,
    cityOptions: [
      {id: 'FI', name: 'Helsinki, FI', queryparam: 'Helsinki'},
      {id: 'NY', name: 'New York, NY', queryparam: 'New_york'},
      {id: 'UK', name: 'London, UK', queryparam: 'London'},
      {id: 'IL', name: 'Chicago, IL', queryparam: 'Chicago'},
      {id: 'MA', name: 'Boston, MA', queryparam: 'Boston'},
      {id: 'TX', name: 'Houston, TX', queryparam: 'Houston'},
      {id: 'SE', name: 'Stockholm, SE', queryparam: 'Stockholm'},
      {id: 'DK', name: 'Copenhagen, DK', queryparam: 'Copenhagen'},
      {id: 'MU', name: 'Port Louis, MU', queryparam: 'Port_louis'},
    ],
   };
    
    /*create the api query..to fetch selected city current weather conditions*/
    $scope.getWeatherData = function(city) {
        var country = (JSON.parse(city)).id;
        var city = (JSON.parse(city)).queryparam;
        var apiKey = getMyApiKey();
        
        $http({
            url:"https://api.wunderground.com/api/"+ apiKey + "/conditions/q/" + country +"/" + city + ".json"
        }).success(function(data, status, headers, config){
          /*  console.log(data);*/
            var result = angular.toJson(data);
            var object = JSON.parse(result);
            $scope.currentConditions = object.current_observation;
            $scope.addWeatherDataToUIList();
        }).error(function(data, status, headers, config){
            $scope.infoText = 'Sorry, no connection to wundergroundAPI. Check your API key or try again later'; 
        /*    console.log(status);*/
        });
    };
    
    /*add current weather conditions of ci*/
    $scope.addWeatherDataToUIList = function (array, index){
        var current = $scope.currentConditions;
        var location = current.display_location;
        var alrearyInList = false;
        for(var item in $scope.weatherArray){
            if($scope.weatherArray[item].city === location.full){
             alrearyInList = true;
             $scope.infoText = "Selected city: " + location.full + " is already on the list. Choose another one.";
             break;
            }else{
             $scope.infoText = "";
            }
        }
        if(!alrearyInList){
        $scope.weatherArray.push({
            city: location.full,
            temperature: current.temp_c,
            weatherImg: current.icon_url,
            weatherInfoTitle: current.icon,
        });
        }
        $scope.data.citySelect = "";
        $scope.showClearListButton = true;
    };
    
    $scope.clearWeatherList = function(){
      /*  console.log('clearlist');*/
        $scope.weatherArray= [];
        $scope.data.citySelect = "";
        $scope.showClearListButton = false;
    }
    
    
}])
 
.filter('reverse', function() {
    return function(weatherArray) {
        return weatherArray.slice().reverse();
    };
  })
/*
  .directive('onEnter', function() {
   return {
       restrict: 'A',
        scope: {
           onEnter: '&'
          },
    link: function(scope, element) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
         scope.onEnter();
         scope.$apply();
        }
      });
    }
  }
});*/