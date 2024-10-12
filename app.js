const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// استيراد المسارات
const billRoutes = require('./routes/billRoutes');
const materialRoutes = require('./routes/materialRoutes');
const debrisRoutes = require('./routes/debrisRoutes');
const authRoutes = require('./routes/authRoutes');

// تحميل إعدادات البيئة
dotenv.config();

// الاتصال بقاعدة البيانات
connectDB();

const app = express();

// إعداد محرك القوالب Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//app.use('/fontawesome', express.static(path.join(__dirname, 'public/css/fontawesome-free')));



// Middleware لتحليل البيانات في الجسم (Body Parser)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// إعداد الملفات الثابتة (مثل CSS و JavaScript)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.render('index', { title: 'Anhar Albasra System' });
});

app.get('/invoice', (req, res) => {
  res.render('layouts/invoice-layout', { title: 'Anhar Albasra System invoice' });
});

// المسارات
app.use('/bills', billRoutes);
app.use('/materials', materialRoutes);
app.use('/debris', debrisRoutes);
app.use('/auth', authRoutes);


// التعامل مع الصفحات غير الموجودة (404)
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
