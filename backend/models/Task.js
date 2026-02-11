import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    is_completed: {
      type: Boolean,
      default: false,
    },
    is_priority: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    font_style: {
      type: String,
      default: 'Inter',
    },
    font_color: {
      type: String,
      default: '#000000',
    },
    is_bold: {
      type: Boolean,
      default: false,
    },
    is_italic: {
      type: Boolean,
      default: false,
    },
    is_underline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
