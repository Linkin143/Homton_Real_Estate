const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, default: 'United States' },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
}, { _id: false });

const specsSchema = new mongoose.Schema({
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  sqft: { type: Number, required: true },
  floors: { type: Number, default: 1 },
  parkingSpaces: { type: Number, default: 1 },
  yearBuilt: { type: Number },
}, { _id: false });

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    type: {
      type: String,
      enum: ['apartment', 'villa', 'penthouse', 'townhouse', 'estate'],
      required: true,
    },
    status: {
      type: String,
      enum: ['for-sale', 'for-rent', 'sold', 'off-market'],
      default: 'for-sale',
    },
    price: {
      type: Number,
      required: [true, 'Property price is required'],
    },
    priceUnit: {
      type: String,
      enum: ['total', 'per-month'],
      default: 'total',
    },
    location: {
      type: locationSchema,
      required: true,
    },
    specs: {
      type: specsSchema,
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length >= 1,
        message: 'At least one image is required',
      },
    },
    amenities: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    agent: {
      name: String,
      phone: String,
      email: String,
      avatar: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Virtual: formatted price ──────────────────────────────────────────────────
propertySchema.virtual('formattedPrice').get(function () {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(this.price);
});

// ─── Pre-save: generate slug ───────────────────────────────────────────────────
propertySchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// ─── Indexes ───────────────────────────────────────────────────────────────────
propertySchema.index({ type: 1 });
propertySchema.index({ featured: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ 'location.city': 1 });
propertySchema.index({ status: 1 });

module.exports = mongoose.model('Property', propertySchema);
