const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addDoctorPage, addDoctor, deleteDoctor, editDoctor, editDoctorPage} = require('./routes/Doctor');
const {addPatientPage, addPatient, deletePatient, editPatient, editPatientPage} = require('./routes/patient');
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'nodeclientNew',
    password: '123456',
    database: 'HospitalManagement'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/', getHomePage);
app.get('/add', addDoctorPage);
app.get('/edit/:id', editDoctorPage);
app.get('/delete/:id', deleteDoctor);
app.post('/add', addDoctor);
app.post('/edit/:id', editDoctor);

app.get('/', getHomePage);
app.get('/addPatientPage', addPatientPage);
app.get('/editPatientPage/:id', editPatientPage);
app.get('/deletePatient/:id', deletePatient);
app.post('/addPatient', addPatient);
app.post('/editDoctor/:id', editPatient);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});