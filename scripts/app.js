angular.module('ngClassifieds', ['ngMaterial', 'ui.router', 'firebase'])
	.config(function ($mdThemingProvider, $stateProvider) {


		var config = {
			apiKey: "AIzaSyChE4Yg8rfOM-FHKc-de0mmgIXKSx5qAZ8",
			authDomain: "angularjsclassifieds.firebaseapp.com",
			databaseURL: "https://angularjsclassifieds.firebaseio.com/"
		};
		firebase.initializeApp(config);


		$mdThemingProvider.theme('default')
			.primaryPalette('teal')
			.accentPalette('orange');

		$stateProvider
			.state('classifieds', {
				url: '/classifieds',
				templateUrl: '/components/classifieds/classifieds.tpl.html',
				controller: 'classifiedsCtrl as vm'
			})
			.state('classifieds.new', {
				url: '/new',
				templateUrl: '/components/classifieds/new/classifieds.new.tpl.html',
				controller: 'newClassifiedsCtrl as vm'
			})
			.state('classifieds.edit', {
				url: '/edit/:id',
				templateUrl: '/components/classifieds/edit/classifieds.edit.tpl.html',
				controller: 'editClassifiedsCtrl as vm',
				params: {
					classifieds: null
				}
			});
	});