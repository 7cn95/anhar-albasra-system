const Bill = require('../models/Bill');
const importExcelToMongo = require('../utils/dataImport');
const path = require('path');

// دالة استيراد البيانات من Excel
importFromExcel = async (req, res) => {
  console.log("import");
  
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'الرجاء تحميل ملف Excel.' });
    }
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    await importExcelToMongo(filePath);
    res.status(200).json({ message: 'تم استيراد البيانات بنجاح!' });
  } catch (error) {
    console.error('خطأ في استيراد البيانات:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء استيراد البيانات.' });
  }
};

// عرض صفحة أنواع الفواتير
getBillsType = async (req, res) => {
  try {
    res.render('bills/bills-dashboard', { title: "نوع الفاتورة" });
  } catch (error) {
    res.status(500).send('خطأ في جلب الصفحة');
  }
};

// عرض كل الفواتير
getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.render('bills/index', { title: 'قائمة الفواتير', bills });
  } catch (error) {
    res.status(500).send('خطأ في جلب الفواتير');
  }
};

// عرض الفواتير حسب النوع
getBillsByType = async (req, res) => {
  try {
    const bills = await Bill.find({ type: req.params.type });
    res.render('bills/index', { title: `فواتير ${req.params.type}`, bills });
  } catch (error) {
    res.status(404).send('not found');
  }
};
getSearchDate = async (req, res) => {
  const { searchDate } = req.query;
  const bills = await Bill.find({ billDate: new Date(searchDate) });
  res.render('bills/index', { bills ,status:"not all"});
}
// عرض صفحة إنشاء فاتورة جديدة
getCreateBill = async (req, res) => {
  try {
    res.render('bills/create', { title: 'إنشاء فاتورة جديدة' });
  } catch (error) {
    res.status(500).send('خطأ في جلب صفحة إنشاء فاتورة');
  }
};

// عرض فاتورة معينة
getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).send('الفاتورة غير موجودة');
    }
    res.render('bills/detail', { title: 'تفاصيل الفاتورة', bill });
  } catch (error) {
    res.status(500).send('خطأ في جلب الفاتورة');
  }
};

// عرض فاتورة بشكل الفاتورة الكاملة
getBillByIdInvoice = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).send('الفاتورة غير موجودة');
    }
    res.render('bills/invoice', { title: ' الفاتورة', bill });
  } catch (error) {
    res.status(500).send('خطأ في جلب الفاتورة');
  }
};

// إنشاء فاتورة جديدة
createBill = async (req, res) => {
  const { billDate, party, vehicleNumber, type, responsible, restriction, name, count, diqPrice, usdPrice, details, note } = req.body;
  const bill = new Bill({
    billDate,
    party,
    vehicleNumber,
    type,
    responsible,
    restriction,
    name,
    count,
    diqPrice,
    usdPrice,
    details,
    note
  });
  try {
    await bill.save();
    res.redirect('/bills/all');
  } catch (error) {
    console.error(error);
    res.render('bills/', { error: 'خطأ في إنشاء الفاتورة' });
  }
};

// عرض صفحة تعديل الفاتورة
editBillPage = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).send('الفاتورة غير موجودة');
    }
    res.render('bills/edit', { title: 'تعديل الفاتورة', bill });
  } catch (error) {
    res.status(500).send('خطأ في تحميل صفحة التعديل');
  }
};

// دالة تعديل الفاتورة
updateBill = async (req, res) => {
  const { billDate, party, vehicleNumber, type, responsible, restriction, name, count, diqPrice, usdPrice, details, note } = req.body;
  const billId = req.params.id;

  try {
    await Bill.findByIdAndUpdate(billId, {
      billDate,
      party,
      vehicleNumber,
      type,
      responsible,
      restriction,
      name,
      count,
      diqPrice,
      usdPrice,
      details,
      note
    });
    res.redirect('/bills/'+billId);
  } catch (error) {
    console.error(error);
    res.redirect(`/bills/${billId}/edit`);
  }
};

// حذف الفاتورة
deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res.status(404).send('الفاتورة غير موجودة');
    }
    res.redirect('/bills/all');
  } catch (error) {
    res.status(500).send('خطأ في حذف الفاتورة');
  }
};

// الحصول على عدد الفواتير المسجلة اليوم
get_dailly_bill =async ()=>{
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const bill_count =await Bill.find({
      createat: { $gte: startOfDay, $lte: endOfDay }
    });
    return bill_count.length;
  } catch (error) {
    console.error('Error fetching today bills count:', error);
    return { message: 'Error fetching today bills count.' };
  }
};

// صفحة استيراد ملف Excel
getUpload = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.render('bills/import', { title: 'رفع بيانات من ملف Excel', bills });
  } catch (error) {
    res.status(500).send('خطأ في جلب الفواتير');
  }
};


// تصدير الدالة لتصبح متاحة للاستدعاء في ملفات أخرى
module.exports = {
  importFromExcel,
  getBillsType,
  getAllBills,
  getBillsByType,
  getSearchDate,
  getCreateBill,
  getBillById,
  getBillByIdInvoice,
  createBill,
  editBillPage,
  updateBill,
  deleteBill,
  getUpload,
  get_dailly_bill // إضافة الدالة هنا للتصدير
};
