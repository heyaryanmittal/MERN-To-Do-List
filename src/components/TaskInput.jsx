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
      setFontColor('#000000');
      setIsBold(false);
      setIsItalic(false);
      setIsUnderline(false);
      setDate(new Date().toISOString().split('T')[0]);
      setShowFormatting(false);
    }
  };

  return (
    <div
      className={`${
        isDark ? 'bg-gray-700' : 'bg-amber-50'
      } rounded-lg p-4 border-2 ${
        isDark ? 'border-gray-600' : 'border-amber-200'
      }`}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700"
            style={{
              fontFamily: fontStyle,
              color: fontColor,
              fontWeight: isBold ? 'bold' : 'normal',
              fontStyle: isItalic ? 'italic' : 'normal',
              textDecoration: isUnderline ? 'underline' : 'none',
              backgroundColor: 'transparent',
            }}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={`px-3 py-2 rounded-lg border-2 focus:outline-none transition-colors ${
              isDark
                ? 'bg-gray-800 border-gray-600 text-white focus:border-amber-500'
                : 'bg-white border-gray-200 text-gray-800 focus:border-amber-500'
            }`}
          />

          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 active:scale-95 transition-all shadow-md font-medium"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setShowFormatting(!showFormatting)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              showFormatting
                ? 'bg-amber-600 text-white'
                : isDark
                ? 'bg-gray-600 text-white hover:bg-gray-500'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Type className="w-4 h-4 inline mr-1" />
            Formatting
          </button>

          {showFormatting && (
            <>
              <button
                type="button"
                onClick={() => setIsBold(!isBold)}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  isBold
                    ? 'bg-amber-600 text-white'
                    : isDark
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bold className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsItalic(!isItalic)}
                className={`px-3 py-1.5 rounded-lg text-sm italic transition-all ${
                  isItalic
                    ? 'bg-amber-600 text-white'
                    : isDark
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Italic className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsUnderline(!isUnderline)}
                className={`px-3 py-1.5 rounded-lg text-sm underline transition-all ${
                  isUnderline
                    ? 'bg-amber-600 text-white'
                    : isDark
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Underline className="w-4 h-4" />
              </button>

              <select
                value={fontStyle}
                onChange={(e) => setFontStyle(e.target.value)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  isDark
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {FONT_STYLES.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>

              <div className="flex gap-1">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFontColor(color)}
                    className={`w-8 h-8 rounded-lg transition-all ${
                      fontColor === color ? 'ring-2 ring-amber-500 scale-110' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}

                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => {
                    setCustomColor('#000000');
                    setFontColor(e.target.value);
                  }}
                  className="w-8 h-8 rounded-lg cursor-pointer"
                  title="Custom color"
                />
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
