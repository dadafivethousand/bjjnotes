const FilmStudy = require('../models/Film'); // Replace with the actual path to your FilmStudy model

exports.addPost = async (req, res) => {
    try {
        const newFilmStudy = new FilmStudy({ ...req.body });
        await newFilmStudy.save();
        res.status(201).json(newFilmStudy);
    } catch (error) {
        console.error('Error in addFilmStudy:', error);
        res.status(500).send('Error adding new film study');
    }
};

exports.getData = async (req, res) => {
    const { userId } = req.params;
    try {
        const filmStudies = await FilmStudy.find({ user: userId }) 
        console.log(filmStudies,'fucku') // Assuming each film study has a 'user' field and optionally a 'date' field
        res.json(filmStudies);
    } catch (error) {
        console.error('Error fetching film studies:', error);
        res.status(500).send('Error fetching film studies');
    }
};

exports.deleteData = async (req, res) => {
    const { id } = req.params;
    try {
        await FilmStudy.findByIdAndDelete(id);
        res.send({ message: 'Film study deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.editData = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedFilmStudy = await FilmStudy.findByIdAndUpdate(id, { ...req.body }, { new: true });
        res.status(200).json(updatedFilmStudy);
    } catch (error) {
        res.status(500).send(error);
    }
};
