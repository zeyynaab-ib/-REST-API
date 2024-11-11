// server.js
require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/user'); // Import du modèle utilisateur

const app = express();
const port = process.env.PORT || 3000;

// Connectez-vous à la base de données MongoDB
mongoose
    .connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database'))
    .catch((error) => console.error('Error connecting to the database:', error));

// Middleware pour analyser les données JSON
app.use(express.json());

// Route GET : Retourne tous les utilisateurs
app.get('/users', async (req, res) => {

    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route POST : Ajoute un nouvel utilisateur
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route PUT : Modifie un utilisateur par ID
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route DELETE : Supprime un utilisateur par ID
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: `User with ID ${id} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
