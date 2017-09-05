const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');

require('dotenv').config();

const router = express.Router();

const app = express();

mongoose.connect('mongodb://admin:admin123@ds036577.mlab.com:36577/marqueztutoring')


app.use(bodyParser.urlencoded({
    extended: true 
}));
// API routes should go before "catch all" route
app.use('/api', router)

// Catch all route
router.get('/', function(req, res) {
    res.json({ message: 'This is only a test'});
})

var studentRoute = router.route('/students/:student_id');
var studentsRoute = router.route('/students');

studentsRoute.get(function(req, res) {
    Student.find(function(err, students) {
        if (err)
        res.send(err);

    res.json(students);
    })
})

studentRoute.get(function(req, res) {
    Student.findById(req.params.student_id, function(err, students) {
        if (err)
        res.send(err);

        res.json(students);
    })
})

studentsRoute.post(function (req, res) {
    var student = new Student();

    student.name = req.body.name;
    student.grade = req.body.grade;
    student.parent = req.body.parent;
    student.contact = req.body.contact;

    student.save(function(err) {
        if (err)
            res.send(err);

        res.json({message: 'New student has been added', data: student });
    });
});

studentRoute.put(function(req, res) {
    Student.findById(req.params.student_id, function(err, student) {
        if (err)
        res.send(err)

        student.grade = req.body.grade;
        student.name = req.body.name;
        student.parent = req.body.parent;
        student.contact = req.body.contact;

        student.save(function(err) {
            if (err)
                res.send(err);
            res.json(student);
        });
    });
})

studentRoute.delete(function(req, res) {
    Student.findByIdAndRemove(req.params.student_id, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Student has been removed!'});
    });
});

app.listen(PORT, function(err) {
    if (err) throw err 
    console.log(`Listening in on PORT: ${PORT}`)
})