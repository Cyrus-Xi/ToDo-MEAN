// Load the todo model.
var Todo = require('./models/todo');

// Expose the routes to our app with module.exports.
module.exports = function(app) {

    // API.
    // Get all todos.
    app.get('/api/todos', function(req, res) {
        // Use mongoose to get all todos in the database.
        Todo.find(function(err, todos) {
            // If error retrieving, send the error. Nothing after res.send(err) will execute.
            if (err)
                res.send(err)

            res.json(todos);    // Return all todos in JSON format.
        });
    });

    // Create todo and send back all todos after creation.
    app.post('/api/todos', function(req, res) {
        // Create a todo. Information comes from AJAX request from Angular.
        Todo.create({
            text : req.body.text,
            done : false
        }, function(err, todo) {
            if (err)
                res.send(err);
            // Get and return all the todos after creation.
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    // Delete a todo.
    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);
            // Get and return all the todos after deletion.
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });

    // Application.
    app.get('*', function(req, res) {
        // Load the single view file (angular will handle the page changes on the front-end).
        res.sendfile('./public/index.html'); 
    });

};
