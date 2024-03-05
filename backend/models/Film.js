const mongoose = require('mongoose');
const filmStudySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
      type: String,
  
    },
    url: {
      type: String,
    },
    notes: {
      type: String,
 
    }
  }, { timestamps: true });
  module.exports = mongoose.model('Film', filmStudySchema);