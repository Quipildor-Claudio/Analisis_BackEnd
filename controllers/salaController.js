const express = require('express');
const Sala = require('../models/Sala');

var SalaController = {
    // Get all Salas
    getSalas: async (req, res) => {
        try {
            const Salas = await Sala.find();
            res.status(200).json(Salas);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching Salas', error });
        }
    },
    // Get a single Sala by ID
    getSalaById: async (req, res) => {
        try {
            const Sala = await Sala.findById(req.params.id);
            if (!Sala) {
                return res.status(404).json({ message: 'Sala not found' });
            }
            res.status(200).json(Sala);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching Sala', error });
        }
    },

    // Create a new Sala
    createSala: async (req, res) => {
        try {
            const newSala = new Sala(req.body);
            const savedSala = await newSala.save();
            res.status(201).json(savedSala);
        } catch (error) {
            res.status(500).json({ message: 'Error creating Sala', error });
        }
    },

    // Update a Sala by ID
    updateSala: async (req, res) => {
        try {
            const updatedSala = await Sala.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedSala) {
                return res.status(404).json({ message: 'Sala not found' });
            }
            res.status(200).json(updatedSala);
        } catch (error) {
            res.status(500).json({ message: 'Error updating Sala', error });
        }
    },

    // Delete a Sala by ID
    deleteSala: async (req, res) => {
        try {
            const deletedSala = await Sala.findByIdAndDelete(req.params.id);
            if (!deletedSala) {
                return res.status(404).json({ message: 'Sala not found' });
            }
            res.status(200).json({ message: 'Sala deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting Sala', error });
        }
    }


}

module.exports = SalaController;








