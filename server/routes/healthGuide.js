import express from 'express';
import HealthGuide from '../models/HealthGuide.js';

const router = express.Router();

// GET /api/healthcare/health-guide?category=Nutrition
router.get('/health-guide', async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: 'category query parameter is required.' });
    }

    const guides = await HealthGuide.find({ category: category });

    if (guides.length === 0) {
      return res.status(404).json({ message: 'No health guides found for this category.' });
    }

    res.status(200).json(guides);
  } catch (error) {
    console.error('Error fetching health guides:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
