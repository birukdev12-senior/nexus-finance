import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../src/models/User";

const URI = process.env.MONGODB_URI || "mongodb+srv://biruktsegayebe_db_user:Zgtk2nG0Je7BZpjN@cluster0.7cftb8v.mongodb.net/?appName=Cluster0I";

async function seed() {
  await mongoose.connect(URI);
  const hashedPassword = await bcrypt.hash("password123", 10);
  await User.create({ name: "Admin", email: "admin@nexus.com", password: hashedPassword, role: "admin" });
  console.log("✅ Admin user added");
  mongoose.disconnect();
}
seed();
