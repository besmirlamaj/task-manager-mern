import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Emri është i detyrueshëm';
    if (!form.email.trim()) newErrors.email = 'Email-i është i detyrueshëm';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email-i nuk është valid';
    if (!form.password) newErrors.password = 'Fjalëkalimi është i detyrueshëm';
    else if (form.password.length < 6) newErrors.password = 'Fjalëkalimi duhet të ketë të paktën 6 karaktere';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const result = await dispatch(registerUser(form));
    if (result.meta.requestStatus === 'fulfilled') navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Regjistrohu</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={{ ...styles.input, borderColor: errors.name ? 'red' : '#ccc' }}
          name="name"
          placeholder="Emri"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p style={styles.error}>{errors.name}</p>}
        <input
          style={{ ...styles.input, borderColor: errors.email ? 'red' : '#ccc' }}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}
        <input
          style={{ ...styles.input, borderColor: errors.password ? 'red' : '#ccc' }}
          name="password"
          type="password"
          placeholder="Fjalëkalimi"
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}
        <button style={styles.btn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Duke u regjistruar...' : 'Regjistrohu'}
        </button>
        <p>Ke llogari? <Link to="/login">Kyçu</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' },
  card: { background: '#fff', padding: '2rem', borderRadius: '8px', width: '320px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  input: { display: 'block', width: '100%', padding: '10px', margin: '10px 0 2px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '10px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' },
  error: { color: 'red', fontSize: '13px', margin: '2px 0' }
};

export default Register;
