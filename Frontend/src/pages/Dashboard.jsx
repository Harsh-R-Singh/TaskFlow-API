import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Plus, Trash2, Edit2, ShieldAlert } from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [editingId, setEditingId] = useState(null);
  const [showAdminTasks, setShowAdminTasks] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchTasks = async () => {
    try {
      const url = showAdminTasks && user.role === 'admin' 
        ? 'http://localhost:5000/api/v1/tasks/all'
        : 'http://localhost:5000/api/v1/tasks';
        
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data.data);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [showAdminTasks]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/v1/tasks/${editingId}`, 
          { title, description, status },
          { headers: { Authorization: `Bearer ${token}` }}
        );
      } else {
        await axios.post('http://localhost:5000/api/v1/tasks', 
          { title, description, status },
          { headers: { Authorization: `Bearer ${token}` }}
        );
      }
      
      setTitle('');
      setDescription('');
      setStatus('pending');
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setEditingId(task._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container animate-fade-in">
      <nav className="glass navbar" style={{ marginBottom: '2rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>Dashboard</h2>
          <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Welcome, {user.username} ({user.role})</span>
        </div>
        <div className="nav-links">
          {user.role === 'admin' && (
            <button 
              className={`btn ${showAdminTasks ? 'btn-accent' : 'glass'}`} 
              onClick={() => setShowAdminTasks(!showAdminTasks)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <ShieldAlert size={18} />
              {showAdminTasks ? 'My Tasks' : 'All Tasks'}
            </button>
          )}
          <button className="btn btn-danger" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2rem', height: 'fit-content' }}>
          <h3 style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            {editingId ? 'Edit Task' : 'New Task'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Description</label>
              <input 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} />
              {editingId ? 'Update Task' : 'Add Task'}
            </button>
            {editingId && (
              <button 
                type="button" 
                className="btn glass" 
                style={{ width: '100%', marginTop: '0.5rem' }}
                onClick={() => {
                  setEditingId(null);
                  setTitle('');
                  setDescription('');
                  setStatus('pending');
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        <div>
          <h2>{showAdminTasks ? 'All System Tasks' : 'Your Tasks'}</h2>
          {tasks.length === 0 ? (
            <div className="glass" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
              No tasks found. Create one to get started!
            </div>
          ) : (
            <div className="task-grid" style={{ marginTop: '0' }}>
              {tasks.map(task => (
                <div key={task._id} className="glass task-card">
                  <div className="task-header">
                    <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{task.title}</h3>
                    <span className={`badge badge-${task.status}`}>{task.status}</span>
                  </div>
                  <p style={{ color: '#cbd5e1', marginBottom: '1rem', flex: 1 }}>{task.description}</p>
                  
                  {showAdminTasks && task.user && (
                    <p style={{ fontSize: '0.875rem', color: '#94a3b8', borderTop: '1px solid var(--glass-border)', paddingTop: '0.5rem' }}>
                      User: {task.user.username} ({task.user.email})
                    </p>
                  )}

                  <div className="task-actions">
                    <button 
                      onClick={() => handleEdit(task)}
                      style={{ background: 'transparent', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '0.5rem' }}
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(task._id)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
