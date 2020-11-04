const fs = require('fs');

module.exports = {
    addPatientPage: (req, res) => {
        res.render('add-player.ejs', {
            title: "Welcome to Hospital Management | Add a new Patients"
            ,message: ''
        });
    },
    addPatient: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let PatientName = req.body.FullName;
     
        let ContactDetails = req.body.contact_Details;
        let medicalHistory = req.body.medical_History;
        let healthCardNumber = req.body.Health_Card_Number;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = healthCardNumber + '.' + fileExtension;

        let usernameQuery = "SELECT * FROM `Patients` WHERE user_name = '" + healthCardNumberername + "'";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'healthCardNumber already exists';
                res.render('add-patient.ejs', {
                    message,
                    title: "Welcome to Socka | Add a new Patients"
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /public/assets/img directory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        // send the player's details to the database
                        let query = "INSERT INTO `Patients` (Patient_Name, Patient_Contact_Details, position, number, image, user_name) VALUES ('" +
                             + "', '" + ContactDetails + "', '" + position + "', '" + medicalHistory + "', '" + image_name + "', '" + healthCardNumber + "')";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                    res.render('add-player.ejs', {
                        message,
                        title: "Welcome to Socka | Add a new Patient"
                    });
                }
            }
        });
    },
    editPatientPage: (req, res) => {
        let PatientId = req.params.id;
        let query = "SELECT * FROM `Patients` WHERE id = '" + PatientId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('edit-player.ejs', {
                title: "Edit  Player"
                ,player: result[0]
                ,message: ''
            });
        });
    },
    editPatient: (req, res) => {
        let playerId = req.params.id;
        let PatientName = req.body.first_name;
        let last_name = req.body.last_name;
        let position = req.body.position;
        let number = req.body.number;

        let query = "UPDATE `Patients` SET `FullName` = '" + PatientName + "', `last_name` = '" + last_name + "', `position` = '" + position + "', `number` = '" + number + "' WHERE `doctors`.`id` = '" + playerId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePatient: (req, res) => {
        let PatientId = req.params.id;
        let getImageQuery = 'SELECT image from `Patients` WHERE id = "' + PatientId + '"';
        let deleteUserQuery = 'DELETE FROM Patients WHERE id = "' + PatientId + '"';

        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};