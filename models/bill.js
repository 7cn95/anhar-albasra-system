const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  billDate: { type: Date, required: true },
  party: { type: String, required: true },
  vehicleNumber: { type: String },
  type: { type: String, required: true },
  responsible: { type: String, required: true },
  restriction: { type: String, required: true },
  name: { type: String, required: true },
  count: { type: Number, required: true, min: 1 }, // حد أدنى للتأكد من أن العدد لا يكون سالبًا
  diqPrice: { type: Number, required: true, min: 0 }, // التأكد من أن السعر لا يكون سالبًا
  usdPrice: { type: Number, required: true, min: 0 },
  details: { type: String }, // تم جعلها اختيارية
  note: { type: String, default: '' }, // قيمة افتراضية للملاحظات
  createat:{type:Date,default:Date.now()}
});

const Bill = mongoose.model('Bill', BillSchema);

module.exports = Bill;
