const mongoose = require('mongoose');

const debrisSchema = new mongoose.Schema({
  receipt_number: {
    type: String,
    required: true
  },
  driver_name: {
    type: String,
    required: true
  },
  vehicle_number: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,  // ساعات ودقائق (مثال: "14:30")
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Debris = mongoose.model('Debris', debrisSchema);

module.exports = Debris
