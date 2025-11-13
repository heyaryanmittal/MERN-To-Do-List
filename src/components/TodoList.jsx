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
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-amber-50'
      }`}
    >
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-3xl md:text-4xl font-bold ${
              isDark ? 'text-amber-200' : 'text-amber-900'
            }`}
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            My To Do List
          </h1>

          <div className="flex gap-2">
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
          } rounded-lg shadow-2xl p-6 md:p-8 border-4 ${
            isDark ? 'border-gray-700' : 'border-amber-300'
          }`}
          style={{
            backgroundImage: isDark
              ? 'none'
              : 'repeating-linear-gradient(transparent, transparent 31px, #e5e5e5 31px, #e5e5e5 32px)',
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
                  isDark={isDark}
                />
              ))
            )}
          </div>
        </div>

        <p
          className={`text-center mt-6 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} •{' '}
          {tasks.filter((t) => t.is_completed).length} completed •{' '}
          {tasks.filter((t) => t.is_priority).length} priority
        </p>
      </div>
    </div>
  );
}
