import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    userName: {
      type: String,
      required: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    profileImage: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    userType: {
      type: String,
    },
    education: {
      type: String,
    },
    gender: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    dob: {
      type: String,
    },
    perAddress: {
      type: String,
    },
    resAddress: {
      type: String,
    },

    cleanliness: String,
    socialHabits: String,
    workOrStudyHours: String,
    hobbies: [String],
    foodPreferences: String,
    personalityTraits: [String],
    sleepHabits: String,
    petPreferences: String,
    budget: Number,
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

export default User;
