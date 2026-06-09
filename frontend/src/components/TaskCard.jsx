import { useState } from 'react';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '../api/apiSlice';

const statusColors = {
  'pending': '#f59e0b',
  'in-progress': '#3b82f6',
  'completed': '#10b981'
};

function TaskCard({ task }) {
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: task.title, description: task.description, status: task.status });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Titulli është i detyrueshëm';
    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await updateTask({ id: task._id, data: form }).unwrap();
      setEditing(false);
      setErrors({});
    } catch (err) {
      setErrors({ server: 'Gabim gjatë ruajtjes' });
    }
  };

  return (
    <div style={styles.card}>
      {editing ? (
        <>
          {errors.server && <p style={styles.error}>{errors.server}</p>}
          <input
            style={{ ...styles.input, borderColor: errors.title ? 'red' : '#ccc' }}
            value={form.title}
            onChange={e => { setForm({ ...form, title: e.target.value }); setErrors({}); }}
          />
          {errors.title && <p style={styles.error}>{errors.title}</p>}
          <textarea
            style={styles.input}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <select style={styles.input} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option value="pending">Në pritje</option>
            <option value="in-progress">Në progres</option>
            <option value="completed">Përfunduar</option>
          </select>
          <button style={styles.btnSave} onClick={handleSave}>Ruaj</button>
          <button style={styles.btnCancel} onClick={() => { setEditing(false); setErrors({}); }}>Anulo</button>
        </>
      ) : (
        <>
          <h3 style={styles.title}>{task.title}</h3>
          <p style={styles.desc}>{task.description}</p>
          <span style={{ ...styles.badge, background: statusColors[task.status] }}>
            {task.status}
          </span>
          <div style={styles.actions}>
            <button style={styles.btnEdit} onClick={() => setEditing(true)}>✏️ Edito</button>
            <button style={styles.btnDelete} onClick={() => deleteTask(task._id)}>🗑️ Fshi</button>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  card: { background: '#fff', borderRadius: '8px', padding: '1rem', marginBottom: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' },
  title: { margin: '0 0 8px', fontSize: '16px' },
  desc: { color: '#666', fontSize: '14px', margin: '0 0 10px' },
  badge: { color: '#fff', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  actions: { marginTop: '12px', display: 'flex', gap: '8px' },
  btnEdit: { padding: '5px 12px', background: '#e0e7ff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  btnDelete: { padding: '5px 12px', background: '#fee2e2', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  btnSave: { padding: '5px 12px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' },
  btnCancel: { padding: '5px 12px', background: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  input: { display: 'block', width: '100%', padding: '8px', margin: '6px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  error: { color: 'red', fontSize: '13px', margin: '2px 0 4px' }
};

export default TaskCard;
