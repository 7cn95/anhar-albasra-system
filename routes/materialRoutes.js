const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// عرض كل المواد
router.get('/', materialController.getMaterials);

// صفحة إنشاء مادة جديدة
router.get('/new', (req, res) => {
  res.render('materials/create', { title: 'إضافة مادة جديدة' });
});

// عرض تفاصيل مادة معينة
router.get('/:id', materialController.getMaterialById);

// إنشاء مادة جديدة
router.post('/', materialController.createMaterial);

// صفحة تعديل مادة موجودة
router.get('/:id/edit', materialController.getEditMaterialForm);

// تعديل مادة موجودة
router.post('/:id/edit', materialController.updateMaterial);

// حذف مادة
router.post('/:id/delete', materialController.deleteMaterial);

module.exports = router;
