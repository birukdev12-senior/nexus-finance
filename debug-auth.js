const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 🔐 እነዚህን በ .env.local ውስጥ ካሉ እሴቶች ጋር አመሳስል
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
const email = 'admin@nexus.com';
const plainPassword = 'password123';

async function debug() {
  console.log('📌 የ MongoDB URI እየተጠቀምን ያለው፦', MONGODB_URI.replace(/:([^@]+)@/, ':****@')); // የይለፍ ቃሉን ደብቆ ያሳያል

  // 1. MongoDB ጋር ተገናኝ
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB ግንኙነት ተሳክቷል።');
  } catch (err) {
    console.error('❌ MongoDB መገናኘት አልተቻለም፦', err.message);
    process.exit(1);
  }

  // 2. NextAuth Secret አለ?
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret) {
    console.log('✅ NEXTAUTH_SECRET ተዋቅሯል።');
  } else {
    console.warn('⚠️ NEXTAUTH_SECRET አልተገለጸም! በ .env.local ውስጥ ይጨምሩ።');
  }

  // 3. User Model ጫን
  const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  }));

  // 4. ተጠቃሚውን ፈልግ
  const user = await User.findOne({ email });
  if (!user) {
    console.error('❌ ተጠቃሚ አልተገኘም፦', email);
    console.log('🛠️ በ MongoDB ውስጥ ይህን ኢሜይል ያለው ተጠቃሚ መፍጠር ያስፈልጋል። እባክዎ seed ስክሪፕቱን ያስኪዱ።');
    process.exit(1);
  }
  console.log('👤 ተጠቃሚ ተገኝቷል፦', user.email, '| ሚና፦', user.role);

  // 5. የይለፍ ቃል ማወዳደር
  const isMatch = await bcrypt.compare(plainPassword, user.password);
  if (isMatch) {
    console.log('✅ የይለፍ ቃል ማረጋገጫ ተሳክቷል!');
    console.log('🎉 አሁን በ http://localhost:3000/login በመለያ', email, 'እና በይለፍ ቃል', plainPassword, 'መግባት ትችላለህ።');
  } else {
    console.error('❌ የይለፍ ቃል አይዛመድም!');
    console.log('🛠️ የይለፍ ቃል ሀሹን እንደገና ለማስቀመጥ እባክዎ fix-admin.js ን ያስኪዱ።');
  }

  await mongoose.disconnect();
}
debug().catch(err => console.error('❌ ያልተጠበቀ ስህተት፦', err));
