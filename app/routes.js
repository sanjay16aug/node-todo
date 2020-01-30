var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        console.log('get all data from mongodb');
        console.log('isForeignProfileExist=>operation: Check foreign Country Profile Exist false');
        console.log('isFARegistered=>condition: Is FA Registered')
        console.log('isSubmit=>condition: isSubmi')
        console.log('isProhibitedCountryProfileExist=>operation: Check Prohibited Country Profile Exist true')
        console.log('isCurrentStateEDDReq=>condition: Is Current State EDD Required')
        console.log('eddECRRRiskRank=>condition: Is ECRR risk rank high')
        console.log('eddInsertTrigger=>operation: inserting edd trigger')
        console.log('edd=>condition: edd required')
        console.log('foriegn=>condition: foriegn or prohibited or edd block type')
        console.log('changeToSave=>operation: change to save')
        console.log('isAutoApproval=>condition: is auto approval')
        console.log('st=>start: Start|past')
        console.log('e=>end: Sucess')
        console.log('cads=>operation: Calling CADS service to save account|approved')
        console.log('edbAcc=>operation: Account Save SP Sucess |rejected')
        console.log('edbParty=>operation: Party Save SP Sucess |rejected')
        console.log('st(right)->isForeignProfileExist->isFARegistered(yes)->isSubmit(yes)->isProhibitedCountryProfileExist->isCurrentStateEDDReq(yes)->eddECRRRiskRank(yes)->eddInsertTrigger->edd(yes)->foriegn(yes)->changeToSave->isAutoApproval(false)->cads->edbAcc(right)->edbParty(right)->e');
        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        console.log('create log');
        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        console.log('delete log');
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        console.log('serve index page');
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
