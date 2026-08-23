const asyncHandler = require('express-async-handler');
const Property = require('../models/Property');

// ─── GET /api/properties ───────────────────────────────────────────────────────
// Query params: type, status, featured, city, minPrice, maxPrice, limit, page
const getAllProperties = asyncHandler(async (req, res) => {
  const {
    type, status, featured, city,
    minPrice, maxPrice,
    limit = 12, page = 1,
    sort = '-createdAt',
  } = req.query;

  const filter = {};
  if (type) filter.type = type;
  if (status) filter.status = status;
  if (featured !== undefined) filter.featured = featured === 'true';
  if (city) filter['location.city'] = { $regex: city, $options: 'i' };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Property.countDocuments(filter);
  const properties = await Property.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit))
    .select('-__v');

  res.json({
    success: true,
    count: properties.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    data: properties,
  });
});

// ─── GET /api/properties/featured ─────────────────────────────────────────────
const getFeaturedProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({ featured: true, status: 'for-sale' })
    .sort('-createdAt')
    .limit(6)
    .select('-__v');

  res.json({ success: true, count: properties.length, data: properties });
});

// ─── GET /api/properties/:id ───────────────────────────────────────────────────
const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).select('-__v');

  if (!property) {
    res.status(404);
    throw new Error(`Property not found with id: ${req.params.id}`);
  }

  // Increment view count
  await Property.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

  res.json({ success: true, data: property });
});

// ─── GET /api/properties/slug/:slug ───────────────────────────────────────────
const getPropertyBySlug = asyncHandler(async (req, res) => {
  const property = await Property.findOne({ slug: req.params.slug }).select('-__v');

  if (!property) {
    res.status(404);
    throw new Error(`Property not found: ${req.params.slug}`);
  }

  res.json({ success: true, data: property });
});

// ─── POST /api/properties ──────────────────────────────────────────────────────
const createProperty = asyncHandler(async (req, res) => {
  const property = await Property.create(req.body);
  res.status(201).json({ success: true, data: property });
});

// ─── PUT /api/properties/:id ──────────────────────────────────────────────────
const updateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!property) {
    res.status(404);
    throw new Error(`Property not found with id: ${req.params.id}`);
  }

  res.json({ success: true, data: property });
});

// ─── DELETE /api/properties/:id ───────────────────────────────────────────────
const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findByIdAndDelete(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error(`Property not found with id: ${req.params.id}`);
  }

  res.json({ success: true, message: 'Property removed successfully' });
});

module.exports = {
  getAllProperties,
  getFeaturedProperties,
  getPropertyById,
  getPropertyBySlug,
  createProperty,
  updateProperty,
  deleteProperty,
};
