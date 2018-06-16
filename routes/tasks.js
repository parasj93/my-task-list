var _ = require('lodash');
var express = require('express');
var { ObjectId } = require('mongodb');
var router = express.Router();
var Tasks = require('../models/task.model');

//GET all task
router.get('/tasks', (req, res) => {
    Tasks.find().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status.send(err);
    })
})

//GET only One task
router.get('/task/:id', (req, res, next) => {
    console.log(req.params.id);
    var id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send('Invalid Object Id');
    }

    Tasks.findById(id).then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

//POST a new task
router.post('/task', (req, res, next) => {
    var task = new Tasks(req.body);
    console.log('newatask', task);
    //console.log(task.title + '     ' + task.isDone);
    // if (!task.title || !task.isDone + '') {
    //     res.status(400);
    //     res.json({
    //         "error": "Bad Data"
    //     })
    // } else {
    //     task.save((err, data) => {
    //         if (err) {
    //             res.send(err);
    //             //console.log('error response', err); 
    //         }
    //         res.json(data);
    //     })
    // }
    task.save((data) => {
        //console.log(data);
        res.send(data);
    }, (err) => {
        res.status(400).send(err);
    })
});

//DELETE the One task
router.post('/task/:id', (req, res, next) => {

    Tasks.remove({ _id: req.params.id = req.params.id }, (err, data) => {
        if (err) {
            res.send(err)
        }
        res.send({ data: 'Record has been deleted Succesfully' });
    })
});

//UPDATE the existing task
router.put('/task/:id', (req, res, next) => {

    //var task = JSON.stri  ngify(req.);
    //console.log('task is ' + task);
    //console.log('   id is ' + req.params.id);
    //console.log('_id is '+req.params._id);
    var id = req.params.id;
    var body = _.pick(req.body, ['title', 'isDone']);

    // body.title = req.body.title;
    // body.isDone = req.body.isDone;
    if (id) {
        console.log('body is what ' + JSON.stringify(body));
    }

    if (!ObjectId.isValid(id)) {
        res.status(404).send('Invalid Object Id');
    }

    //body.title = req.body.title;
    //body.isDone = req.body.isDone;

    Tasks.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((doc) => {
        console.log(doc);
        if (!doc) {
            res.status(404).send();
        }
        res.send(doc);
    }).catch((err) => {
        res.status(400).send();
    })
})
module.exports = router;