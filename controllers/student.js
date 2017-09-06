const Student = require('../models/student');

exports.postStudents = function (req, res) {
    var student = new Student();

    student.name = req.body.name;
    student.grade = req.body.grade;
    student.parent = req.body.parent;
    student.contact = req.body.contact;
    student.userId = req.user._id;

    student.save(function(err) {
        if (err)
            res.send(err);

        res.json({message: 'New student has been added', data: student });
    });
};



exports.getStudents = function(req, res) {
    Student.find({ userId: req.user_id }, function(err, students) {
        if (err)
        res.send(err);

    res.json(students);
    });
};


exports.getStudent = function(req, res) {
    Student.findById({ userId: req.user._id, _id: req.params.beer_id }, function(err, student) {
        if (err)
        res.send(err);

        res.json(student);
    });
};

exports.putStudent = function(req, res) {
    Student.update({ 
        userId: req.user._id, _id: req.params.beer_id }, 
        { grade: req.body.grade, name: req.body.name, 
            parent: req.body.parent, 
            contact: req.body.contact }, 
            function(err, student) {
                if (err)
                res.send(err)

        res.json({ message: 'Student updated!'})
    });
};

exports.deleteBeer = function(req, res) {
    Student.remove({ userId: req.user._id, _id: req.params.beer_id }, function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Student has been removed!'});
    });
};