import { useState, useEffect } from 'react';
import { Plus, Type, Bold, Italic, Underline } from 'lucide-react';

const FONT_STYLES = [
  'Inter',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Arial',
  'Verdana',
  'Comic Sans MS',
  'Trebuchet MS',
];

const PRESET_COLORS = [
  '#000000',
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
];

export default function TaskInput({ onAdd, isDark }) {
  const [title, setTitle] = useState('');
  const [showFormatting, setShowFormatting] = useState(false);
  const [fontStyle, setFontStyle] = useState('Inter');
  // Initialize with black color by default, will be updated when isDark changes
  const [fontColor, setFontColor] = useState('#000000');
  const [customColor, setCustomColor] = useState('#000000');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Update font color when theme changes
  useEffect(() => {
    setFontColor(isDark ? '#ffffff' : '#000000');
    setCustomColor(isDark ? '#ffffff' : '#000000');
  }, [isDark]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get current date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    
    // Check if selected date is in the past
    if (selectedDate < today) {
      alert('Please select today\'s date or a future date');
      return;
    }
    
    if (title.trim()) {
      onAdd(title, {
        font_style: fontStyle,
        font_color: fontColor,
        is_bold: isBold,
        is_italic: isItalic,
        is_underline: isUnderline,
        date,
      });
      setTitle('');
      setFontStyle('Inter');
      setFontColor(isDark ? '#ffffff' : '#000000');
      setCustomColor(isDark ? '#ffffff' : '#000000');
      setIsBold(false);
      setIsItalic(false);
      setIsUnderline(false);
      setDate(new Date().toISOString().split('T')[0]);
      setShowFormatting(false);
    }
  };

  return (
    <div
      className={`rounded-xl p-4 border-2 ${
        isDark ? 'border-gray-700' : 'border-amber-100'
      } w-full shadow-md`}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <div className="relative flex-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task..."
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400' 
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                }`}
                style={{
                  fontFamily: fontStyle,
                  color: fontColor,
                  fontWeight: isBold ? 'bold' : 'normal',
                  fontStyle: isItalic ? 'italic' : 'normal',
                  textDecoration: isUnderline ? 'underline' : 'none',
                }}
              />
              <button
                type="button"
                onClick={() => setShowFormatting(!showFormatting)}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md transition-colors ${
                  isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                }`}
                title="Formatting options"
              >
                <Type className="w-4 h-4" />
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  isDark 
                    ? 'border-gray-600 bg-gray-700 text-gray-100' 
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>
          </div>

          {showFormatting && (
            <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">

              <button
                type="button"
                onClick={() => setIsBold(!isBold)}
                className={`p-2 rounded-md transition-colors ${
                  isBold
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsItalic(!isItalic)}
                className={`p-2 rounded-md transition-colors ${
                  isItalic
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsUnderline(!isUnderline)}
                className={`p-2 rounded-md transition-colors ${
                  isUnderline
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                title="Underline"
              >
                <Underline className="w-4 h-4" />
              </button>

              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

              <select
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                className="px-2 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                title="Font family"
              >
                {FONT_STYLES.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>

              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

              <div className="flex items-center gap-1">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-5 h-5 rounded-full border-2 transition-all ${
                      fontColor === color
                        ? 'ring-2 ring-offset-1 ring-amber-500 border-white dark:border-gray-800'
                        : 'border-transparent hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFontColor(color)}
                    title={color}
                  />
                ))}
                <div className="flex items-center gap-2 ml-1">
                  <div className="relative">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 overflow-hidden"
                      style={{ backgroundColor: customColor }}
                    >
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => {
                          setFontColor(e.target.value);
                          setCustomColor(e.target.value);
                        }}
                        className="w-full h-full opacity-0 cursor-pointer"
                        title="Custom color"
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Custom
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
