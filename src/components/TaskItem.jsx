import { Star, Trash2, Edit, Check, X } from 'lucide-react';
import { useState } from 'react';

export default function TaskItem({
  task,
  onDelete,
  onTogglePriority,
  onToggleComplete,
  onUpdate,
  isDark,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim()) {
      onUpdate(task._id, editedTitle);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };
  const getTextStyle = () => {
    let textDecoration = '';
    if (task.is_underline && task.is_completed) {
      textDecoration = 'underline line-through';
    } else if (task.is_underline) {
      textDecoration = 'underline';
    } else if (task.is_completed) {
      textDecoration = 'line-through';
    }

    // Always use theme-appropriate colors for better visibility
    const defaultTextColor = isDark ? '#e5e7eb' : '#111827'; // Light gray for dark mode, almost black for light
    const textColor = task.font_color && task.font_color !== '#ffffff' ? task.font_color : defaultTextColor;
    
    return {
      fontFamily: task.font_style || 'Inter',
      color: textColor,
      fontWeight: task.is_bold ? 'bold' : 'normal',
      fontStyle: task.is_italic ? 'italic' : 'normal',
      textDecoration,
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`flex items-start gap-3 p-3 sm:p-4 rounded-lg transition-all group ${
        isDark
          ? 'hover:bg-gray-700/50 bg-gray-800/50'
          : 'hover:bg-amber-50 bg-white/50'
      } border border-transparent hover:border-amber-200/30`}
    >
      <input
        type="checkbox"
        checked={task.is_completed}
        onChange={() => onToggleComplete(task._id, task.is_completed)}
        className="mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-2 cursor-pointer accent-amber-600 flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1 px-2 py-1 border rounded"
              style={{
                ...getTextStyle(),
                textShadow: 'none',
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'white',
                color: isDark ? '#ffffff' : '#1f2937', // Using gray-800 for better contrast
                borderColor: isDark ? '#4b5563' : '#d1d5db', // gray-600 in dark, gray-300 in light
              }}
              autoFocus
            />
            <button
              onClick={handleSave}
              className="p-1 text-green-500 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              title="Save"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-red-500 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <p className="text-base sm:text-lg break-words leading-relaxed" style={getTextStyle()}>
            {task.title}
          </p>
        )}
        <p
          className={`text-xs mt-1 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {formatDate(task.date)}
        </p>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={() => {
            setEditedTitle(task.title);
            setIsEditing(true);
          }}
          className={`p-1.5 rounded-md transition-colors ${
            isDark
              ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700/50'
              : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
          }`}
          title="Edit task"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onTogglePriority(task._id, task.is_priority)}
          className={`p-1.5 rounded-lg transition-colors ${
            task.is_priority
              ? 'text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20'
              : isDark
              ? 'text-gray-400 hover:text-yellow-400 hover:bg-gray-700/50'
              : 'text-gray-400 hover:text-yellow-600 hover:bg-amber-50'
          }`}
          title={task.is_priority ? 'Remove priority' : 'Mark as priority'}
        >
          <Star
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill={task.is_priority ? 'currentColor' : 'none'}
          />
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className={`p-1.5 rounded-lg transition-colors ${
            isDark
              ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700/50'
              : 'text-gray-400 hover:text-red-600 hover:bg-amber-50'
          }`}
          title="Delete task"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
