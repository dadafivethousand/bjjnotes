const Instructional = require('../models/Instructional'); // Replace with the actual path to your Instructional model

exports.addPost = async (req, res) => {
    try {
        const newInstructional = new Instructional({ ...req.body });
        await newInstructional.save();
        res.status(201).json(newInstructional);
    } catch (error) {
        console.error('Error in addInstructional:', error);
        res.status(500).send('Error adding new instructional');
    }
};

exports.getInstructionals = async (req, res) => {
    const { userId } = req.params;
    try {
        const instructionals = await Instructional.find({   user: userId  }); // Assuming each instructional has a 'user' field and optionally a 'date' field
        res.json(instructionals);
    } catch (error) {
        console.error('Error fetching instructionals:', error);
        res.status(500).send('Error fetching instructionals');
    }
};

exports.deleteInstructional = async (req, res) => {
    const { id } = req.params;
    try {
        await Instructional.findByIdAndDelete(id);
        res.send({ message: 'Instructional deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.editInstructional = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedInstructional = await Instructional.findByIdAndUpdate(id, { ...req.body }, { new: true });
        res.status(200).json(updatedInstructional);
    } catch (error) {
        res.status(500).send(error);
    }
};
