import React, { useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

const AuthPage = ({ onLogin, isRegister }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login';
      const res = await api.post(endpoint, formData);
      onLogin(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #F8F7FF 0%, #EDE9FE 100%)', display: 'flex', flexDirection: 'column' }}>
      {/* Back to Landing */}
      <div style={{ padding: '1.5rem 2rem' }}>
        <Link to="/" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💰</div>
            <div style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)' }}>SpendSmart</div>
          </div>

          {/* Card */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border)' }}>
            <h2 style={{ marginBottom: '0.4rem', fontSize: '1.6rem' }}>
              {isRegister ? 'Create your account' : 'Welcome back!'}
            </h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '1.75rem', fontSize: '0.9rem' }}>
              {isRegister ? 'Start tracking your expenses in seconds.' : 'Login to view your dashboard and expenses.'}
            </p>

            {error && (
              <div className="alert alert-error">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {isRegister && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rahul Sharma"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Min. 6 characters"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}
                disabled={loading}
              >
                {loading ? <span className="spinner"></span> : (isRegister ? '🚀 Create Account' : '🔓 Login')}
              </button>
            </form>

            <div className="divider">or</div>

            <div style={{ textAlign: 'center', color: 'var(--text-2)', fontSize: '0.875rem' }}>
              {isRegister ? (
                <>Already have an account? <Link to="/login" style={{ fontWeight: 600 }}>Login here</Link></>
              ) : (
                <>New to SpendSmart? <Link to="/register" style={{ fontWeight: 600 }}>Create account</Link></>
              )}
            </div>
          </div>

          <p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: '0.78rem', marginTop: '1.5rem' }}>
            Your data is encrypted and securely stored. 🔐
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
