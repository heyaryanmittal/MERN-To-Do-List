import express from 'express';
import Task from '../models/Task.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user.id })
      .sort({ is_priority: -1, date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { title, date, font_style, font_color, is_bold, is_italic, is_underline } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Please provide task title' });
    }

    const task = await Task.create({
      user_id: req.user.id,
      title,
      date: date || new Date(),
      font_style: font_style || 'Inter',
      font_color: font_color || '#000000',
      is_bold: is_bold || false,
      is_italic: is_italic || false,
      is_underline: is_underline || false,
    });

    res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Task deleted',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
