(function () {
	"use strict";

	angular
		.module("ngClassifieds")
		.factory('classifiedsFactory', function($http,  $firebaseObject, $firebaseArray) {

			// var ref = new Firebase('https://angularjsclassifieds.firebaseio.com/');
			var ref = firebase.database().ref();

			return {
				ref: $firebaseArray(ref)
			}
		})
})();