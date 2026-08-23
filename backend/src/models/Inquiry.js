const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Your name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [20, 'Phone number too long'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      default: null,
    },
    propertyTitle: {
      type: String,
      default: 'General Inquiry',
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
    source: {
      type: String,
      enum: ['contact-form', 'property-page', 'virtual-tour'],
      default: 'contact-form',
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes ───────────────────────────────────────────────────────────────────
inquirySchema.index({ status: 1 });
inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ propertyId: 1 });

module.exports = mongoose.model('Inquiry', inquirySchema);
