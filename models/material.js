const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  driver_name: { // اسم السائق
    type: String,
    required: true
  },
  receipt_number: { // رقم الوصل
    type: String,
    required: true
  },
  material_type: { // نوع المواد
    type: String,
    required: true
  },
  vehicle_number: { // رقم المركبة
    type: String,
    required: true
  },
  quantity: { // الكمية
    type: Number,
    required: true
  },
  price: { // السعر
    type: Number,
    required: true
  },
  material_date: { // التاريخ
    type: Date,
    required: true
  },
  details: { // التفاصيل
    type: String
  },
  created_at: { // تاريخ الإنشاء (إضافي)
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Material', materialSchema);
