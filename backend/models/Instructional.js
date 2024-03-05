const mongoose = require('mongoose');
const InstructionalNotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
      type: String,
  
    },
    entries: [{
      title:{ type: String, unique: true },
      notes: String,
    }]
  }, { timestamps: true });
  
 
module.exports = mongoose.model('Instructional', InstructionalNotesSchema);
