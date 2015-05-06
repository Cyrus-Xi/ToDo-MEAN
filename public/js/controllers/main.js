angular.module('todoController', [])

    .controller('mainController', function($scope, $http, Todos) {
        $scope.formData = {};

        // GET.
        // When landing on the page, get all todos and show them.
        // Use the service.
        Todos.get()
            .success(function(data) {
                $scope.todos = data;
            });

        // CREATE.
        // When submitting the add form, send the text to the node API.
        $scope.createTodo = function() {
            // Validate the formData to ensure something is there.
            // If form is empty, nothing will happen.
            if (!$.isEmptyObject($scope.formData)) {
                // Call the create function from the service (returns a promise
                // object).
                Todos.create($scope.formData)
                    // If successful, call the get function to get all todos.
                    .success(function(data) {
                        $scope.formData = {};   // Clear the form.
                        $scope.todos = data;    // Assign the new list of todos.
                    });
            }
        };

        // DELETE.
        // Delete a todo after checking it.
        $scope.deleteTodo = function(id) {
            Todos.delete(id)
                // If successful, call the get function to get all todos.
                .success(function(data) {
                    $scope.todos = data;    // Assign the new list of todos.
                });
        };
    });
