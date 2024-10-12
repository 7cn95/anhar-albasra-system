const Debris = require('../models/debris');

// عرض كل الأنقاض
exports.getAllDebris = async (req, res) => {
  try {
    const debrisList = await Debris.find({});
    res.render('debris/index', { title: 'قائمة الأنقاض', debrisList });
  } catch (err) {
    console.error(err);
    res.status(500).send('حدث خطأ أثناء جلب الأنقاض');
  }
};

// عرض تفاصيل الأنقاض
exports.getDebrisById = async (req, res) => {
  const { id } = req.params;
  try {
    const debris = await Debris.findById(id);
    if (!debris) {
      return res.status(404).send('الأنقاض غير موجودة');
    }
    res.render('debris/detail', { title: 'تفاصيل الأنقاض', debris });
  } catch (err) {
    console.error(err);
    res.status(500).send('حدث خطأ أثناء جلب تفاصيل الأنقاض');
  }
};

// إنشاء أنقاض جديدة
exports.createDebris = async (req, res) => {
  const { receipt_number, driver_name, vehicle_number, type, quantity, date, time, amount } = req.body;
  try {
    const newDebris = new Debris({
      receipt_number,
      driver_name,
      vehicle_number,
      type,
      quantity,
      date,
      time,
      amount
    });
    await newDebris.save();
    res.redirect('/debris');
  } catch (err) {
    console.error(err);
    res.status(500).send('حدث خطأ أثناء إضافة الأنقاض');
  }
};

// صفحة تعديل الأنقاض
exports.editDebrisPage = async (req, res) => {
  const { id } = req.params;
  try {
    const debris = await Debris.findById(id);
    if (!debris) {
      return res.status(404).send('الأنقاض غير موجودة');
    }
    res.render('debris/edit', { title: 'تعديل الأنقاض', debris });
  } catch (err) {
    console.error(err);
    res.status(500).send('حدث خطأ أثناء جلب بيانات الأنقاض للتعديل');
  }
};

// تعديل الأنقاض
exports.updateDebris = async (req, res) => {
  const { id } = req.params;
  const { receipt_number, driver_name, vehicle_number, type, quantity, date, time, amount } = req.body;
  try {
    await Debris.findByIdAndUpdate(id, {
      receipt_number,
      driver_name,
      vehicle_number,
      type,
      quantity,
      date,
      time,
      amount
    });
    res.redirect(`/debris/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('حدث خطأ أثناء تعديل الأنقاض');
  }
};

// حذف الأنقاض
exports.deleteDebris = async (req, res) => {
  const { id } = req.params;
  try {
    await Debris.findByIdAndDelete(id);
    res.redirect('/debris');
  } catch (err) {
    console.error(err);
    res.status(500).send('حدث خطأ أثناء حذف الأنقاض');
  }
};
