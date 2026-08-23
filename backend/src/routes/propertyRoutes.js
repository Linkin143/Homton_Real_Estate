const express = require('express');
const router = express.Router();
const {
  getAllProperties,
  getFeaturedProperties,
  getPropertyById,
  getPropertyBySlug,
  createProperty,
  updateProperty,
  deleteProperty,
} = require('../controllers/propertyController');

// ─── Public Routes ─────────────────────────────────────────────────────────────
router.get('/', getAllProperties);
router.get('/featured', getFeaturedProperties);
router.get('/slug/:slug', getPropertyBySlug);
router.get('/:id', getPropertyById);

// ─── Admin Routes (add auth middleware here later) ─────────────────────────────
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;
