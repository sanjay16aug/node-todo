angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				//drawGraph(todos[0].text);
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		$scope.mydraw = function(data) {
			drawGraph(data);
		};

		$scope.drawGraphData = function() {
			console.log($scope.todos);
			drawGraph($scope.todos[0].text);
		};
		


		function drawGraph(data) {
			var btn = document.getElementById("run"),
				cd = document.getElementById("code"),
				chart;

			(btn.onclick = function () {
				var code = cd.value;

				if (chart) {
					chart.clean();
				}
				if(data == undefined){
					chart = flowchart.parse(code);
				}else{
					chart = flowchart.parse(data);
				}
				
				chart.drawSVG('canvas', {
					'line-width': 3,
					'maxWidth': 100,
					'text-margin': 10,
					'font-size': 14,
					'font': 'normal',
					'font-family': 'Helvetica',
					'font-weight': 'normal',
					'font-color': 'black',
					'line-color': 'black',
					'element-color': 'black',
					'fill': 'white',
					'yes-text': 'yes',
					'no-text': 'no',
					'arrow-end': 'block',
					'scale': 1,
					'symbols': {
						'start': {
							'font-color': 'red',
							'element-color': 'green',
							'fill': 'yellow'
						},
						'end': {
							'class': 'end-element'
						}
					},
					'flowstate': {
						'past': {
							'fill': '#CCCCCC',
							'font-size': 12
						},
						'current': {
							'fill': 'yellow',
							'font-color': 'red',
							'font-weight': 'bold'
						},
						'future': {
							'fill': '#FFFF99'
						},
						'request': {
							'fill': 'blue'
						},
						'invalid': {
							'fill': '#444444'
						},
						'approved': {
							'fill': '#58C4A3',
							'font-size': 12,
							'yes-text': 'APPROVED',
							'no-text': 'n/a'
						},
						'rejected': {
							'fill': '#C45879',
							'font-size': 12,
							'yes-text': 'n/a',
							'no-text': 'REJECTED'
						}
					}
				});

				$('[id^=sub1]').click(function () {
					alert('info here');
				});
			})();
		}

	}]);