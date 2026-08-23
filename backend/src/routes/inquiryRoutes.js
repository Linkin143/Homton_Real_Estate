const express = require('express');
const router = express.Router();
const { createInquiry, getAllInquiries, updateInquiryStatus } = require('../controllers/inquiryController');

// ─── Public ────────────────────────────────────────────────────────────────────
router.post('/', createInquiry);

// ─── Admin (add auth middleware here later) ────────────────────────────────────
router.get('/', getAllInquiries);
router.patch('/:id/status', updateInquiryStatus);

module.exports = router;
