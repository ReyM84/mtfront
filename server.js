const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const studentController = require('./controllers/student');
const userController = require('./controllers/user');
const passport = require('passport');
const authController = require('./controllers/auth');

require('dotenv').config();

mongoose.connect('mongodb://admin:admin123@ds036577.mlab.com:36577/marqueztutoring')

const app = express();

app.use(bodyParser.urlencoded({
    extended: true 
}));

const router = express.Router();

router.route('/students')
    .post(authController.isAuthenticated, studentController.postStudents)
    .get(authController.isAuthenticated, studentController.getStudents);

router.route('/students/student_id')
    .get(authController.isAuthenticated, studentController.getStudent)
    .put(authController.isAuthenticated, studentController.putStudent)
    .delete(authController.isAuthenticated, studentController.deleteBeer);

router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

// API routes should go before "catch all" route
app.use('/api', router);

app.listen(PORT, function(err) {
    if (err) throw err 
    console.log(`Listening in on PORT: ${PORT}`)
})