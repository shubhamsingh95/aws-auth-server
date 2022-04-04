const mongoose = require('mongoose');

module.exports.connect = function () {
    mongoose.connect('mongodb://localhost:27017/test', (err) => {
    if (err) {
        console.log("error occured")
    }
    else 
        console.log("Mongodb successfully connected");
});
}


const UserSchema = new mongoose.Schema({
    userName : String,
    password : String
})

const User = mongoose.model("User", UserSchema);

module.exports.addUser = function (req, res) {
    let userName = req.body.userName;
    let password = req.body.password;

    let user = new User({userName, password})
    user.save().then((data) => {
        console.log("user created");
        return res.json(data)
    }).catch((err) => {
        console.log("failed");
        return res.status(500).send({user : "creation failed"})
    });
}

module.exports.validateLogin = function (req, res) {

    let givenUserName = req.query.userName;
    let givenPassword = req.query.password;

    
    User.findOne({"userName" : givenUserName}).then((data) => {
        console.log("Data found");
        if (data.password == givenPassword) {
            // create JWT
            console.log(data)
            return res.send({"Authenticated" : true})
        } else {
            return res.send({"Authenticated" : false});
        }
        
    }).catch((err) => {
        console.log("NOT FOund");
        res.send("User not found")
    })
}