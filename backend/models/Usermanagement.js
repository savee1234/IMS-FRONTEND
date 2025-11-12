const mongoose = require('mongoose');
  const userManangementSchema = new mongoose.Schema({
    userId: {
      type: String,
      unique: true
    },
    userName: {
      type: String,
      required: true
    },
    Designation:{
        type: String,
        required: true
    },
    ContactNumber:{
        type: String,
        required: true
    },
    ActiveStatus:{
        type: Boolean,
        default: true
    }

    }, { timestamps: true });