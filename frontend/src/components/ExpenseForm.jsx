import React, { useState } from 'react';
import api from '../api';

const CATEGORIES = ['Food', 'Coffee', 'Tea', 'Travel', 'Cab', 'Shopping', 'Rent', 'Bills', 'Entertainment', 'Health', 'Others'];
const CATEGORY_ICONS = { Food: '🍔', Coffee: '☕', Tea: '🍵', Travel: '✈️', Cab: '🚕', Shopping: '🛍️', Rent: '🏠', Bills: '💡', Entertainment: '🎬', Health: '🏥', Others: '📦' };

const ExpenseForm = ({ token, onExpenseAdded, budget }) => {
  const [mode, setMode] = useState('nlp'); // nlp | manual
  const [nlpText, setNlpText] = useState('');
  const [manual, setManual] = useState({ amount: '', category: 'Food', description: '', date: new Date().toISOString().split('T')[0] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const safeBudget = budget ? parseFloat(budget) : 10000;
  const dynamicExamples = [
    `Spent ₹${Math.round(safeBudget * 0.05)} on pizza for dinner`,
    `Paid ₹${Math.round(safeBudget * 0.30)} rent today`,
    `Bought shoes for ₹${Math.round(safeBudget * 0.10)}`,
    `Ola cab ₹${Math.round(safeBudget * 0.02)} to airport`,
  ];

  // Simple client-side preview of NLP extraction
  const parsePreview = (text) => {
    const amtMatch = text.match(/[\d,]+(\.\d{1,2})?/);
    const amount = amtMatch ? parseFloat(amtMatch[0].replace(',', '')) : null;
    const lower = text.toLowerCase();
    let category = 'Others';
    if (lower.includes('pizza') || lower.includes('food') || lower.includes('lunch') || lower.includes('dinner') || lower.includes('zomato') || lower.includes('swiggy') || lower.includes('burger')) category = 'Food';
    else if (lower.includes('coffee') || lower.includes('cappuccino') || lower.includes('latte')) category = 'Coffee';
    else if (lower.includes('tea') || lower.includes('chai')) category = 'Tea';
    else if (lower.includes('cab') || lower.includes('uber') || lower.includes('ola') || lower.includes('taxi')) category = 'Cab';
    else if (lower.includes('rent') || lower.includes('house') || lower.includes('apartment')) category = 'Rent';
    else if (lower.includes('travel') || lower.includes('train') || lower.includes('flight') || lower.includes('airport') || lower.includes('trip')) category = 'Travel';
    else if (lower.includes('shopping') || lower.includes('clothes') || lower.includes('shoes') || lower.includes('amazon') || lower.includes('flipkart')) category = 'Shopping';
    else if (lower.includes('bill') || lower.includes('electricity') || lower.includes('water') || lower.includes('internet') || lower.includes('recharge')) category = 'Bills';
    else if (lower.includes('movie') || lower.includes('concert') || lower.includes('entertainment') || lower.includes('netflix') || lower.includes('game')) category = 'Entertainment';
    else if (lower.includes('medicine') || lower.includes('doctor') || lower.includes('hospital') || lower.includes('health')) category = 'Health';
    return { amount, category };
  };

  const handleNlpChange = (e) => {
    const val = e.target.value;
    setNlpText(val);
    if (val.trim().length > 3) {
      setPreview(parsePreview(val));
    } else {
      setPreview(null);
    }
  };

  const handleNlpSubmit = async (e) => {
    e.preventDefault();
    if (!nlpText.trim()) return;
    setLoading(true);
    setError('');
    try {
      await api.post('/expenses/nlp', { text: nlpText }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNlpText('');
      setPreview(null);
      onExpenseAdded('Expense added via Smart Input! ✨');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process text');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/expenses/manual', manual, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setManual({ amount: '', category: 'Food', description: '', date: new Date().toISOString().split('T')[0] });
      onExpenseAdded('Expense added successfully! ✅');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-no-hover">
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Add New Expense</h3>

      {/* Mode Toggle */}
      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button className={`tab-btn ${mode === 'nlp' ? 'active' : ''}`} onClick={() => setMode('nlp')}>🧠 Smart Input</button>
        <button className={`tab-btn ${mode === 'manual' ? 'active' : ''}`} onClick={() => setMode('manual')}>📝 Manual</button>
      </div>

      {error && <div className="alert alert-error">⚠️ {error}</div>}

      {mode === 'nlp' && (
        <form onSubmit={handleNlpSubmit} className="animate-fade-in">
          <div className="form-group">
            <label className="form-label">Describe your expense</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder='e.g. "Spent ₹500 on pizza for dinner"'
              value={nlpText}
              onChange={handleNlpChange}
              style={{ resize: 'none', lineHeight: '1.6' }}
            />
          </div>

          {/* NLP Preview */}
          {preview && (
            <div style={{ background: 'var(--primary-light)', borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Detected Amount</div>
                <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{preview.amount ? `₹${preview.amount.toLocaleString('en-IN')}` : '—'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</div>
                <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{CATEGORY_ICONS[preview.category]} {preview.category}</div>
              </div>
            </div>
          )}

          {/* Quick examples */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: '0.5rem' }}>Try these examples:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {dynamicExamples.map(ex => (
                <button type="button" key={ex} onClick={() => { setNlpText(ex); setPreview(parsePreview(ex)); }}
                  style={{ padding: '0.3rem 0.7rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '99px', fontSize: '0.78rem', cursor: 'pointer', color: 'var(--text-2)', transition: 'var(--transition)' }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.color = 'var(--primary)'; }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-2)'; }}>
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading || !nlpText.trim()}>
            {loading ? <span className="spinner"></span> : '✨ Add via Smart Input'}
          </button>
        </form>
      )}

      {mode === 'manual' && (
        <form onSubmit={handleManualSubmit} className="animate-fade-in">
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>
            <input type="number" step="0.01" min="0" className="form-control" placeholder="0.00"
              value={manual.amount} onChange={e => setManual({ ...manual, amount: e.target.value })} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-control" value={manual.category} onChange={e => setManual({ ...manual, category: e.target.value })}>
                {CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_ICONS[c]} {c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" value={manual.date}
                onChange={e => setManual({ ...manual, date: e.target.value })} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description (optional)</label>
            <input type="text" className="form-control" placeholder="e.g. Groceries from BigBazaar"
              value={manual.description} onChange={e => setManual({ ...manual, description: e.target.value })} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? <span className="spinner"></span> : '➕ Add Expense'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ExpenseForm;
