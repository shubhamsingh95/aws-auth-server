const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./dbOperations');

db.connect();

const app = express();

app.use(cors());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', "*");
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addUser", db.addUser);

app.get("/login", db.validateLogin);

app.listen(8000, () => {
    console.log("server listening to port")
})