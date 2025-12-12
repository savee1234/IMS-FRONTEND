const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  assignedTo: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Usermanagement',
    required: true,
  },
  assignedBy: {
    type: String,
    required: true,
  },
  Assignment:{
    type:String,
    enum:['Main Assignment','Sub Assignment'],
    required:true
  }

});

module.exports = mongoose.model("Assignments", assignmentSchema);  
  