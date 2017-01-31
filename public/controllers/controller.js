
angular
	.module('app', [])
	.controller('AppCtrl',function($scope,$http) {
    	'use strict';
	
	alert('inside controlller');
	console.log('hello from controller');

	var refresh=function(){
		$http.get('/contactlist').then(successcallback);

		function successcallback(response){
			console.log('i got data back from the server');
			console.log(response);
			$scope.contactlist=response.data;
		}
	}

	refresh();
	

	$scope.addContact=function(){
		console.log($scope.contact);
		$http.post('/contactlist',$scope.contact).then(successcallback);

		function successcallback(response){
			console.log(response);
			refresh();
		}

	}

	$scope.remove=function(id){
		console.log(id);
		$http.delete('/contactlist/' + id).then(successCallback);

		function successCallback(response){
			refresh();
		}
	}

	$scope.edit=function(id){
		console.log(id);
		$http.get('/contactlist/' + id).then(successCallback);

		function successCallback(response){
			console.log(response);
			$scope.contact=response.data;
		}
	}

	$scope.update=function(){
		console.log($scope.contact._id);
		$http.put('/contactlist/' + $scope.contact._id,$scope.contact).then(successCallback);

		function successCallback(response){
			refresh();
		}
	}

	$scope.deselect=function(){
		$scope.contact="";
	}
			
});