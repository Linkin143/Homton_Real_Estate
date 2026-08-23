const asyncHandler = require('express-async-handler');
const Inquiry = require('../models/Inquiry');

// ─── POST /api/inquiries ───────────────────────────────────────────────────────
const createInquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, message, propertyId, propertyTitle, source } = req.body;

  const inquiry = await Inquiry.create({
    name,
    email,
    phone,
    message,
    propertyId: propertyId || null,
    propertyTitle: propertyTitle || 'General Inquiry',
    source: source || 'contact-form',
    ipAddress: req.ip,
  });

  res.status(201).json({
    success: true,
    message: 'Your inquiry has been submitted. Our team will contact you shortly.',
    data: {
      id: inquiry._id,
      name: inquiry.name,
      email: inquiry.email,
      createdAt: inquiry.createdAt,
    },
  });
});

// ─── GET /api/inquiries ────────────────────────────────────────────────────────
const getAllInquiries = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Inquiry.countDocuments(filter);
  const inquiries = await Inquiry.find(filter)
    .populate('propertyId', 'title slug')
    .sort('-createdAt')
    .skip(skip)
    .limit(Number(limit))
    .select('-__v');

  res.json({
    success: true,
    count: inquiries.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: inquiries,
  });
});

// ─── PATCH /api/inquiries/:id/status ──────────────────────────────────────────
const updateInquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const inquiry = await Inquiry.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!inquiry) {
    res.status(404);
    throw new Error('Inquiry not found');
  }

  res.json({ success: true, data: inquiry });
});

module.exports = { createInquiry, getAllInquiries, updateInquiryStatus };
