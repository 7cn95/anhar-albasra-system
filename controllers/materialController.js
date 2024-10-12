const Material = require('../models/material'); // استيراد مودل المواد

// عرض جميع المواد
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.render('materials/index', { materials });
  } catch (err) {
    res.status(500).send('خطأ في استرداد المواد');
  }
};

// عرض نموذج إضافة مادة جديدة
exports.getCreateMaterialForm = (req, res) => {
  res.render('materials/new');
};

// إنشاء مادة جديدة
exports.createMaterial = async (req, res) => {
  const { driver_name, receipt_number, material_type, vehicle_number, quantity, price, material_date, details } = req.body;

  try {
    const newMaterial = new Material({
      driver_name,
      receipt_number,
      material_type,
      vehicle_number,
      quantity,
      price,
      material_date,
      details
    });

    await newMaterial.save();
    res.redirect('/materials');
  } catch (err) {
    res.status(500).send('خطأ في إنشاء المادة');
  }
};

// عرض تفاصيل مادة واحدة
exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).send('المادة غير موجودة');
    }
    res.render('materials/detail', { material });
  } catch (err) {
    res.status(500).send('خطأ في استرداد المادة');
  }
};

// عرض نموذج تعديل مادة
exports.getEditMaterialForm = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).send('المادة غير موجودة');
    }
    res.render('materials/edit', { material });
  } catch (err) {
    res.status(500).send('خطأ في استرداد المادة للتعديل');
  }
};

// تعديل مادة
exports.updateMaterial = async (req, res) => {
  const { driver_name, receipt_number, material_type, vehicle_number, quantity, price, material_date, details } = req.body;

  try {
    await Material.findByIdAndUpdate(req.params.id, {
      driver_name,
      receipt_number,
      material_type,
      vehicle_number,
      quantity,
      price,
      material_date,
      details
    });

    res.redirect(`/materials/${req.params.id}`);
  } catch (err) {
    res.status(500).send('خطأ في تعديل المادة');
  }
};

// حذف مادة
exports.deleteMaterial = async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.redirect('/materials');
  } catch (err) {
    res.status(500).send('خطأ في حذف المادة');
  }
};
