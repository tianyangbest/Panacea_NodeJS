var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});

/* GET Userlist page. */
router.get('/userlist', function (req, res) {
    var db = req.db;
    var collection = db.get('z_users');
    collection.find({}, {}, function (e, docs) {
        res.render('userlist', {
            "userlist": docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function (req, res) {
    res.render('user_profile', { title: '创建新账号' });
});

/* POST to Add User Service */
router.post('/adduser', function (req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var z_name = req.body.z_name;
    var z_phone = req.body.z_phone;
    var z_pw = req.body.z_pw;

    // Set our collection
    var collection = db.get('z_users');

    // Submit to the DB
    collection.insert({
        "z_name": z_name,
        "z_phone": z_phone,
        "z_pw": z_pw
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("/users/userlist");
            // And forward to success page
            res.redirect("/users/userlist");
        }
    });
});
module.exports = router;
