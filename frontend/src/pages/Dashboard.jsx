import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import {
  useGetTasksQuery,
  useCreateTaskMutation
} from '../api/apiSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const { data: tasks = [], isLoading } = useGetTasksQuery();
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();

  const [form, setForm] = useState({ title: '', description: '', status: 'pending' });
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Titulli është i detyrueshëm';
    if (form.title.trim().length > 100) newErrors.title = 'Titulli duhet të jetë maksimumi 100 karaktere';
    return newErrors;
  };

  const handleAdd = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await createTask(form).unwrap();
      setForm({ title: '', description: '', status: 'pending' });
      setErrors({});
      setShowForm(false);
    } catch (err) {
      setErrors({ server: err.data?.message || 'Gabim gjatë shtimit' });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>📋 Task Manager</h2>
        <div>
          <span style={{ marginRight: '12px', color: '#555' }}>👤 {user?.name || 'User'}</span>
          <button style={styles.btnLogout} onClick={handleLogout}>Dil</button>
        </div>
      </div>

      <div style={styles.content}>
        <button style={styles.btnAdd} onClick={() => { setShowForm(!showForm); setErrors({}); }}>
          {showForm ? '✕ Mbyll' : '+ Shto Detyrë'}
        </button>

        {showForm && (
          <div style={styles.formBox}>
            <h3>Detyrë e re</h3>
            {errors.server && <p style={styles.error}>{errors.server}</p>}
            <input
              style={{ ...styles.input, borderColor: errors.title ? 'red' : '#ccc' }}
              placeholder="Titulli *"
              value={form.title}
              onChange={e => { setForm({ ...form, title: e.target.value }); setErrors({}); }}
            />
            {errors.title && <p style={styles.error}>{errors.title}</p>}
            <textarea
              style={styles.input}
              placeholder="Përshkrimi"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={3}
            />
            <select style={styles.input} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="pending">Në pritje</option>
              <option value="in-progress">Në progres</option>
              <option value="completed">Përfunduar</option>
            </select>
            <button style={styles.btnSave} onClick={handleAdd} disabled={isCreating}>
              {isCreating ? 'Duke shtuar...' : 'Shto'}
            </button>
          </div>
        )}

        {isLoading && <p>Duke ngarkuar...</p>}

        {!isLoading && tasks.length === 0 && (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>Nuk ka detyra. Shto një detyrë të re!</p>
        )}

        {tasks.map(task => <TaskCard key={task._id} task={task} />)}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: '#f0f2f5' },
  header: { background: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
  content: { maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' },
  btnAdd: { marginBottom: '20px', padding: '10px 20px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '15px' },
  btnLogout: { padding: '6px 14px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  formBox: { background: '#fff', padding: '1.5rem', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
  input: { display: 'block', width: '100%', padding: '10px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '14px' },
  btnSave: { padding: '8px 20px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error: { color: 'red', fontSize: '13px', margin: '2px 0 4px' }
};

export default Dashboard;
