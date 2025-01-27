const Participant = require('../models/Participant');
const jwt = require('jsonwebtoken');

// Get all participants
const getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find();
    return res.status(200).json(participants);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Create a new participant
const postParticipants = async (req, res) => {
  try {
    const { name, email, number } = req.body;
    const participant = new Participant({ name, email, number });
    await participant.save();
    return res.status(201).json({ message: 'Participant created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login a participant
const postLogin = async (req, res) => {
  const { email, number } = req.body;

  const participant = await Participant.findOne({ email, number });

  if (!participant) {
    return res.status(404).json({ message: 'Participant not found' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: participant._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, user: participant });
};

// Update score
const postScoreParticipants = async (req, res) => {
  try {
    const { score } = req.body;
    const participant = await Participant.findById(req.params.id);
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    participant.score = score;
    await participant.save();
    return res.status(200).json({ message: 'Score updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { postParticipants, postScoreParticipants, getAllParticipants, postLogin };
