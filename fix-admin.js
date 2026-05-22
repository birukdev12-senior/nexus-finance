const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { MongoMemoryServer } = require('mongodb-memory-server');

const email = 'admin@nexus.com';
const plainPassword = 'password123';

async function main() {
  // 1. MongoDB አገልጋይ አስነሳ
  const mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  console.log('⏳ MongoDB ተነስቷል፣ URI:', uri);

  // 2. ተገናኝ
  await mongoose.connect(uri);
  console.log('✅ MongoDB ግንኙነት ተሳክቷል');

  // 3. User model ፍጠር (inline schema)
  const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  });
  const User = mongoose.models.User || mongoose.model('User', UserSchema);

  // 4. Admin ተጠቃሚ ፈልግ ወይም ፍጠር
  let user = await User.findOne({ email });
  if (user) {
    console.log('👤 ተጠቃሚ ተገኝቷል፣ የይለፍ ቃል በማዘመን ላይ...');
  } else {
    console.log('🆕 አዲስ አስተዳዳሪ በመፍጠር ላይ...');
    user = new User({ name: 'Admin', email, role: 'admin' });
  }

  // 5. የይለፍ ቃል ሀሽ አድርጎ አስቀምጥ
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  user.password = hashedPassword;
  await user.save();
  console.log('💾 ተጠቃሚ ተቀምጧል');

  // 6. ማረጋገጥ
  const testUser = await User.findOne({ email });
  const isMatch = await bcrypt.compare(plainPassword, testUser.password);
  if (isMatch) {
    console.log('✅ ማረጋገጫ ተሳክቷል!');
    console.log('መለያ:', email);
    console.log('ይለፍ ቃል:', plainPassword);
  } else {
    console.log('❌ ማረጋገጫ አልተሳካም — bcrypt.compare ላይ ችግር አለ');
  }

  await mongoose.disconnect();
  await mongoServer.stop();
  console.log('👋 MongoDB ተዘግቷል');
}

main().catch(err => console.error('❌ ስህተት፦', err));
