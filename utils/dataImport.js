// excelImport.js
const xlsx = require('xlsx');
const Bill = require('../models/Bill'); // افترض أن هذا هو مسار موديل الفواتير

// دالة لاستيراد البيانات من ملف Excel
async function importExcelToMongo(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);

  // تحقق من اتصال MongoDB مسبقاً
  if (!Bill) throw new Error("Model not connected to MongoDB");

  // إدخال البيانات إلى قاعدة البيانات
  for (const row of data) {
    const newBill = new Bill({
      date: row['التاريخ'],
      party: row['الجهه'],
      vehicleNumber: row['رقم المركبه'],
      type: row['النوع'],
      responsible: row['المسؤول'],
      restriction: row['القيد'],
      name: row['الاسم'],
      count: row['العدد'],
      amountIQD: row['المبلغ بالعراقي'],
      amountUSD: row['المبلغ بالدولار'],
      details: row['التفاصيل'],
      notes: row['الملاحظات']
    });

    await newBill.save();
  }

  console.log('Data imported successfully!');
}