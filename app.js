const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
// const axios = require('axios');

const app = express();
app.use(cors());
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mudasir@1231',
    database: 'appointment-db',
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Express middleware
app.use(express.json());

// Create
app.post('/create', (req, res) => {
    const { amount, description, category } = req.body;
    const sql = 'INSERT INTO expenses (amount, description, category) VALUES (?, ?, ?)';
    db.query(sql, [amount, description, category], (err, result) => {
        if (err) {
            res.status(500).send('Error creating user');
        } else {
            res.status(201).send('User created successfully');
        }
    });
});

// Read
app.get('/read/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM expenses WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send('Error fetching user');
        } else {
            res.status(200).json(result);

        }
    });
});
// read whoe data form the data base

app.get('/read/', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM expenses';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send('Error fetching exoeneses');
        } else {
            res.status(200).json(result);

        }
    });
});

// Update
app.put('/update/:id', (req, res) => {
    const userId = req.params.id;
    const { userName, phoneNo, email } = req.body;
    const sql = 'UPDATE users SET userName = ?, phoneNo =?, email = ? WHERE id = ?';
    db.query(sql, [userName, phoneNo, email, userId], (err, result) => {
        if (err) {
            res.status(500).send('Error updating user');
        } else {
            res.status(200).send('User updated successfully');
        }
    });
});

// Delete
app.delete('/delete/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM expenses WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting user');
        } else {
            res.status(200).send('User deleted successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
