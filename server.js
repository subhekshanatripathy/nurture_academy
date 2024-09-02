const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin'); // Import Firebase Admin SDK
const serviceAccount = require('./nurture-academy-1324-firebase-adminsdk-ai56i-63b7c89b8a.json');

const app = express();
const port = 3000;

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://nurture-academy-1324.firebaseio.com' // Replace with your database URL
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to handle form submission
app.post('/submit', (req, res) => {
    const formData = req.body;
    
    // Convert form data to a string
    const formDataString = `
State: ${formData.state}
District: ${formData.district}
Locality: ${formData.locality}
Student Name: ${formData.studentName}
Class: ${formData.class}
School: ${formData.school}
Mobile Number: ${formData.mobileNumber}
Email: ${formData.email}
-------------------------------------------
`;

    // Append form data to search_data.txt
    fs.appendFile(path.join(__dirname, 'search_data.txt'), formDataString, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Form submitted successfully!' });
    });
});

// Route to handle Firebase user authentication
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Create a new user with email and password using Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password
        });
        res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to handle user login with email and password
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verify user credentials with Firebase Authentication
        const user = await admin.auth().getUserByEmail(email);
        // You would need to validate the password here, but Firebase Admin SDK does not support this directly
        // In a production environment, you would typically handle password verification on the client-side
        res.status(200).json({ message: 'User authenticated successfully', uid: user.uid });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
