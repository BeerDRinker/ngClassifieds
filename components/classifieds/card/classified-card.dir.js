(function () {
	"use strict";
	angular
		.module('ngClassifieds')
		.directive('classifiedCard', function () {
			return {
				templateUrl: '/components/classifieds/card/classified-card.tpl.html',
				scope: {
					classifieds: '=',
					classifiedsFilter: '=classifiedsFilter',
					category: '=category'
				},
				controller: classifiedCardController,
				controllerAs: "vm"
			}

			function classifiedCardController($state, $scope, $mdDialog) {

				var vm = this;
				vm.editClassified = editClassified;
				vm.deleteClassified = deleteClassified;

				function editClassified(classified) {
					$state.go('classifieds.edit', {
						id: classified.$id
					});
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

				function showToast(message) {
					$mdToast.show(
						$mdToast.simple()
						.content(message)
						.position('top, right')
						.hideDelay(3000)
					);
				}
			}
		});

})();