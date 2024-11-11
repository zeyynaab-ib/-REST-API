// models/User.js
const mongoose = require('mongoose');

// Définition du schéma pour un utilisateur
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Export du modèle
module.exports = mongoose.model('User', userSchema);
