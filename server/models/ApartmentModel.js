import mongoose from 'mongoose';

const apartmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    rent: {
      type: Number,
      // required: true,
      // min: 1,
    },
    size: {
      type: Number,
      // required: true,
      // min: 450,
    },
    type: {
      type: String,
      required: true,
    },
    usps: {
      type: Array,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      // required: true,
    },

    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: [String],
      //   required: true,
    },
    furnished: {
      type: Boolean,
      default: false,
      required: true,
    },
    parking: {
      type: Boolean,
      default: false,
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    isAvailble: {
      type: Boolean,
      default: true,
    },

    ratings: {
      type: Number,
      min: 1,
      max: 5,
    },

    // userRef: {
    //   type: String,
    //   //   required: true,
    // },
  },
  { timestamps: true },
);

const Apartment = mongoose.model('Apartment', apartmentSchema);

export default Apartment;
