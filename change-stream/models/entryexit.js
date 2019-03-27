    const mongoose = require('mongoose');  
    const Schema   = mongoose.Schema;

    const entryExitSchema = new Schema({ 
      task: { type: String },
    });

    module.exports = mongoose.model('EntryExit', entryExitSchema); 