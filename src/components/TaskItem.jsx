import { Star, Trash2 } from 'lucide-react';

export default function TaskItem({
  task,
  onDelete,
  onTogglePriority,
  onToggleComplete,
  isDark,
}) {
  const getTextStyle = () => {
    let textDecoration = '';
    if (task.is_underline && task.is_completed) {
      textDecoration = 'underline line-through';
    } else if (task.is_underline) {
      textDecoration = 'underline';
    } else if (task.is_completed) {
      textDecoration = 'line-through';
    }

    return {
      fontFamily: task.font_style || 'Inter',
      color: task.font_color || (isDark ? '#ffffff' : '#000000'),
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
      className={`flex items-start gap-3 p-4 rounded-lg transition-all group ${
        isDark
          ? 'hover:bg-gray-700 bg-gray-750'
          : 'hover:bg-amber-50 bg-transparent'
      }`}
    >
      <input
        type="checkbox"
        checked={task.is_completed}
        onChange={() => onToggleComplete(task._id, task.is_completed)}
        className="mt-1 w-5 h-5 rounded border-2 cursor-pointer accent-amber-600"
      />

      <div className="flex-1 min-w-0">
        <p className="text-lg break-words" style={getTextStyle()}>
          {task.title}
        </p>
        <p
          className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
        >
          {formatDate(task.date)}
        </p>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onTogglePriority(task._id, task.is_priority)}
          className={`p-1.5 rounded transition-colors ${
            task.is_priority
              ? 'text-yellow-500'
              : isDark
              ? 'text-gray-400 hover:text-yellow-500'
              : 'text-gray-400 hover:text-yellow-600'
          }`}
          title={task.is_priority ? 'Remove priority' : 'Mark as priority'}
        >
          <Star
            className="w-5 h-5"
            fill={task.is_priority ? 'currentColor' : 'none'}
          />
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className={`p-1.5 rounded transition-colors ${
            isDark
              ? 'text-gray-400 hover:text-red-400'
              : 'text-gray-400 hover:text-red-600'
          }`}
          title="Delete task"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
