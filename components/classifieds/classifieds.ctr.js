(function () {
	"use strict";

	angular
		.module('ngClassifieds')
		.controller('classifiedsCtrl', function ($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

			var vm = this;
			
			vm.categories;
			vm.classifieds;
			vm.classified;
			vm.closeSidebar = closeSidebar;
			vm.deleteClassified = deleteClassified;
			vm.editing;
			vm.editClassified = editClassified;
			vm.openSidebar = openSidebar;
			vm.saveClassified = saveClassified;

			vm.saveEdit = saveEdit;


			vm.classifieds = classifiedsFactory.ref;
			vm.classifieds.$loaded().then(function(classifieds) {
				vm.categories = getCategories(classifieds);
			});

			$scope.$on('newClassified', function (event, classified) {
				vm.classifieds.$add(classified);
				showToast('Classified saved');
			});

			$scope.$on('editSaved', function (event, message) {
				showToast(message);
			});

			var contact = {
				name: "John Doe",
				phone: "(555) 555-5555",
				email: "johndoe@gmail.com"
			}

			function showToast(message) {
				$mdToast.show(
					$mdToast.simple()
					.content(message)
					.position('top, right')
					.hideDelay(3000)
				);
			}

			function getCategories(classifieds) {
				var categories = [];
				angular.forEach(classifieds, function (item) {
					angular.forEach(item.categories, function (category) {
						categories.push(category);
					})
				})
				return _.uniq(categories);
			}

			function openSidebar() {
				$state.go('classifieds.new');
			}

			function closeSidebar() {
				$mdSidenav('left').close();
			}

			function saveClassified(classified) {
				if (classified) {
					classified.contact = contact;
					vm.classifieds.push(classified);
					vm.classified = {};
					vm.closeSidebar();
					showToast("Classified Saved!")
				}
			}

			function editClassified(classified) {
				$state.go('classifieds.edit', {
					id: classified.$id
				});
			}

			function saveEdit() {
				vm.editing = false;
				vm.classified = {};
				closeSidebar();
				showToast("Edit saved!")
			}

			function deleteClassified(classified, event) {
				var confirm = $mdDialog.confirm()
					.title('Are you shure you want to delete ' + classified.title + '?')
					.ok('Yes')
					.cancel('No')
					.targetEvent(event);
				$mdDialog.show(confirm)
					.then(function () {
						vm.classifieds.$remove(classified);
						showToast('Classified deleted!')
					}, function () {

					});
			}
 		});
})();