const express = require('express');
const router = express.Router();
const debrisController = require('../controllers/debrisController');

// عرض كل الأنقاض
router.get('/', debrisController.getAllDebris);

// صفحة إنشاء أنقاض جديدة
router.get('/create', (req, res) => {
  res.render('debris/create', { title: 'إضافة أنقاض جديدة' });
});

// عرض تفاصيل الأنقاض
router.get('/:id', debrisController.getDebrisById);

// إنشاء أنقاض جديدة
router.post('/', debrisController.createDebris);

// صفحة تعديل الأنقاض
router.get('/:id/edit', debrisController.editDebrisPage);

// تعديل الأنقاض
router.post('/:id/edit', debrisController.updateDebris);

// حذف الأنقاض
router.post('/:id/delete', debrisController.deleteDebris);

module.exports = router;
