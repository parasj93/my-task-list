var express = require('express');
var router = express.Router();
var tasks = require('../models/task.model');

//all task
router.get('/tasks', (req, res, next) => {
    tasks.find((err, data) => {
        if (err) {
            res.send(err);
        }

        res.json(data);
    })
})

//only 1 task
router.get('/task/:id', (req, res, next) => {
    console.log(req.params.id);
    tasks.findOne({ _id: req.params.id = req.params.id }, (err, test) => {
        if (err) {
            res.send(err);
        }

        res.json(test);
    })

})

//save a task
router.post('/task', (req, res, next) => {
    var task = new tasks(req.body);
    console.log('newatask', task);
    //console.log(task.title + '     ' + task.isDone   );
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
    task.save((err, data) => {
        if (err) {
            res.send(err);
            //console.log('error response', err); 
        }
        res.json(data);
    })
});

//delete task

router.post('/task/:id', (req, res, next) => {
    tasks.remove({ _id: req.params.id = req.params.id }, (err, data) => {
        if (err) {
            res.send(err)
        }
        res.send({ data: 'Record has been deleted Succesfully' });
    })
});

//update task
router.put('/task/:id', (req, res, next) => {

    //var task = JSON.stri  ngify(req.);
    console.log('task is '+task);
    console.log('   id is '+req.params.id);
    //console.log('_id is '+req.params._id);

    tasks.findByIdAndUpdate({ _id:req.params.id = req.params.id }, task, (err, res) => {
        console.log('error response', err); 
        console.log('data response - 1', res); 
        if (err) {
            //console.log(err)
            console.log('error response', err); 
        };
        console.log('data response -2 ', res); 
    })

})
module.exports = router;