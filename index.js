const express = require('express');
const app = express();

// Configures files in .env into the program
require('dotenv').config();

// Configures the session cookies, which 
const session = require('express-session')({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session); // copy

app.get('/', (req, res) => res.sendFile(__dirname + "/public/index.html"));
app.get('/login', (req, res) => res.sendFile(__dirname + "/public/login.html"));
app.get('/signup', (req, res) => res.sendFile(__dirname + "/public/signup.html"));

app.post('/login', (req, res) => {
    req.session.username = req.body.username;
    res.send("Works");
});

app.post('/signup', (req, res) => {
    req.session.username = req.body.username;
    res.send("Works");
});

app.get('/whatismyusername', (req, res) => {
    res.send(req.session.username); 
});

app.listen(3000, () => console.log("started"));