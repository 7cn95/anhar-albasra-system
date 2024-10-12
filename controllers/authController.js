const User = require('../models/user');
const bcrypt = require('bcryptjs');

// عرض صفحة تسجيل الدخول
exports.loginPage = (req, res) => {
  res.render('auth/login', { title: 'تسجيل الدخول' });
};

// معالجة تسجيل الدخول
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).render('auth/login', { error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    // حفظ بيانات الجلسة
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('خطأ في تسجيل الدخول');
  }
};

// معالجة تسجيل الخروج
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};

// عرض صفحة التسجيل
exports.registerPage = (req, res) => {
  res.render('auth/register', { title: 'إنشاء حساب جديد' });
};

// معالجة التسجيل
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.redirect('/auth/login');
  } catch (error) {
    res.status(500).send('خطأ في إنشاء الحساب');
  }
};
