module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `doctors` ORDER BY id ASC"; // query database to get all the doctors

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Hospital Management | View Doctor"
                ,doctors: result
            });
        });
    },
};