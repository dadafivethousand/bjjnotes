const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    preTrainingGoals: String,
    whatWentRight: String,
    whatWentWrong: String,
    takeAways: String,
    trainingDate: {
        type: Date,
        default: () => Date.now(),
    },
    takeAways: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Post', PostSchema);
