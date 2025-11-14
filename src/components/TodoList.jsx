import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import { LogOut, Plus, Star, Trash2, Download, Sun, Moon } from 'lucide-react';
import TaskItem from './TaskItem';
import TaskInput from './TaskInput';

export default function TodoList() {
  const { user, token, signOut, setUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      loadTasks();
    }
  }, [user, token]);

  const loadTasks = async () => {
    try {
      const response = await api.tasks.getAll(token);
      setTasks(response.tasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
    setLoading(false);
  };

  const addTask = async (title, formatting) => {
    try {
      const response = await api.tasks.create(token, {
        title,
        ...formatting,
      });
      setTasks([response.task, ...tasks]);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.tasks.delete(token, id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const togglePriority = async (id, isPriority) => {
    try {
      const response = await api.tasks.update(token, id, { is_priority: !isPriority });
      setTasks(tasks.map((task) => (task._id === id ? response.task : task)));
    } catch (error) {
      console.error('Failed to toggle priority:', error);
    }
  };

  const toggleComplete = async (id, isCompleted) => {
    try {
      const response = await api.tasks.update(token, id, { is_completed: !isCompleted });
      setTasks(tasks.map((task) => (task._id === id ? response.task : task)));
    } catch (error) {
      console.error('Failed to toggle complete:', error);
    }
  };

  const updateTask = async (id, newTitle) => {
    try {
      const response = await api.tasks.update(token, id, { title: newTitle });
      setTasks(tasks.map((task) => (task._id === id ? response.task : task)));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = user?.theme_mode === 'light' ? 'dark' : 'light';
      const response = await api.auth.updateTheme(token, newTheme);
      if (response.user) {
        setUser(response.user);
      }
    } catch (error) {
      console.error('Failed to update theme:', error);
    }
  };

  const downloadPDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('My To Do List', 20, 20);

    doc.setFontSize(12);
    let y = 40;

    tasks.forEach((task) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      const priority = task.is_priority ? '[★] ' : '';
      const completed = task.is_completed ? '[✓] ' : '[ ] ';
      const text = `${priority}${completed}${task.title}`;

      doc.text(text, 20, y);
      y += 10;
    });

    doc.save('todo-list.pdf');
  };

  const isDark = user?.theme_mode === 'dark';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full transition-colors duration-300">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h1
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center sm:text-left ${
              isDark ? 'text-amber-800' : 'text-amber-800'
            }`}
            style={{ 
              fontFamily: "'Courier New', monospace"
            }}
          >
            My To Do List
          </h1>

          <div className="flex justify-center sm:justify-end gap-2 flex-wrap">
            <button
              onClick={downloadPDF}
              className={`p-2 rounded-lg transition-all ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              } shadow-md`}
              title="Download as PDF"
            >
              <Download className="w-5 h-5" />
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-300'
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              } shadow-md`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={signOut}
              className={`p-2 rounded-lg transition-all ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              } shadow-md`}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className={`${
            isDark ? 'bg-gray-800' : 'bg-white'
          } rounded-xl shadow-lg p-4 sm:p-6 border-2 ${
            isDark ? 'border-gray-700' : 'border-amber-200'
          }`}
          style={{
            backgroundImage: isDark
              ? 'none'
              : 'repeating-linear-gradient(transparent, transparent 31px, #f3f4f6 31px, #f3f4f6 32px)',
          }}
        >
          <TaskInput onAdd={addTask} isDark={isDark} />

          <div className="space-y-3 mt-6">
            {tasks.length === 0 ? (
              <p
                className={`text-center py-8 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                } italic`}
              >
                No tasks yet. Start adding some!
              </p>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onDelete={deleteTask}
                  onTogglePriority={togglePriority}
                  onToggleComplete={toggleComplete}
                  onUpdate={updateTask}
                  isDark={isDark}
                />
              ))
            )}
          </div>
        </div>

        <div className="mt-4 sm:mt-6 text-center">
          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="inline-block mx-1">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
            <span className="mx-1">•</span>
            <span className="inline-block mx-1">
              {tasks.filter((t) => t.is_completed).length} completed
            </span>
            <span className="mx-1">•</span>
            <span className="inline-block mx-1">
              {tasks.filter((t) => t.is_priority).length} priority
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
