import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { toPng } from 'html-to-image';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const COLORS = ['#7C3AED', '#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#EC4899', '#6B7280'];
const CATEGORY_ICONS = { Food: '🍔', Coffee: '☕', Tea: '🍵', Travel: '✈️', Cab: '🚕', Shopping: '🛍️', Rent: '🏠', Bills: '💡', Entertainment: '🎬', Health: '🏥', Others: '📦' };

const fmt = (n) => '₹' + parseFloat(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

// ─── Budget Card Component ─────────────────────────────────────────
const BudgetCard = ({ token, thisMonthSpent, onBudgetChange }) => {
  const [budget, setBudget] = useState(null);
  const [inputVal, setInputVal] = useState('');
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  const fetchBudget = async () => {
    try {
      const res = await axios.get('http://localhost:5000/budget', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBudget(res.data.amount);
      if (res.data.amount) onBudgetChange(res.data.amount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchBudget(); }, [token]);

  const handleSave = async () => {
    const val = parseFloat(inputVal);
    if (!val || val <= 0) { setError('Enter a valid amount'); return; }
    setSaving(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/budget', { amount: val }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBudget(res.data.amount);
      onBudgetChange(res.data.amount);
      setEditing(false);
      setInputVal('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save budget');
    } finally {
      setSaving(false);
    }
  };

  const spent = parseFloat(thisMonthSpent || 0);
  const remaining = budget ? parseFloat(budget) - spent : null;
  const percent = budget ? Math.min((spent / parseFloat(budget)) * 100, 100) : 0;
  const isOver = remaining !== null && remaining < 0;
  const isWarning = remaining !== null && remaining >= 0 && percent >= 80;

  const barColor = isOver ? '#EF4444' : isWarning ? '#F59E0B' : '#10B981';

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      border: `2px solid ${isOver ? '#FEE2E2' : isWarning ? '#FEF3C7' : '#EDE9FE'}`,
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: 'var(--shadow)'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
            Monthly Budget
          </div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-1)' }}>{currentMonth}</div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {budget && (
            <button className="btn btn-ghost btn-sm" onClick={() => setShowSuggestions(!showSuggestions)} style={{ fontSize: '0.8rem', background: showSuggestions ? 'var(--primary-light)' : 'transparent', color: showSuggestions ? 'var(--primary)' : '' }}>
              💡 Suggestions
            </button>
          )}
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => { setEditing(!editing); setInputVal(budget || ''); setError(''); }}
            style={{ fontSize: '0.8rem' }}
          >
            {editing ? '✕ Cancel' : budget ? '✏️ Edit' : '➕ Set Budget'}
          </button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && budget && (
        <div className="animate-fade-in" style={{ marginBottom: '1.25rem', background: 'var(--bg)', borderRadius: '10px', padding: '1rem', border: '1px solid var(--border)' }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-1)', fontWeight: 700 }}>💡 Smart Allocation for {fmt(budget)}</h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginBottom: '1rem' }}>Based on the 50/30/20 rule, here's a recommended budget breakdown:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span><strong>Needs (50%)</strong> - Rent, Bills, Health</span>
              <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{fmt(budget * 0.50)}</span>
            </div>
            <div className="progress-bar-wrap" style={{ height: '6px', marginBottom: '0.25rem' }}>
              <div className="progress-bar" style={{ width: '50%', background: 'var(--primary)' }}></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span><strong>Wants (30%)</strong> - Food, Entertainment, Shopping</span>
              <span style={{ fontWeight: 700, color: '#F59E0B' }}>{fmt(budget * 0.30)}</span>
            </div>
            <div className="progress-bar-wrap" style={{ height: '6px', marginBottom: '0.25rem' }}>
              <div className="progress-bar" style={{ width: '30%', background: '#F59E0B' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span><strong>Savings/Buffer (20%)</strong></span>
              <span style={{ fontWeight: 700, color: '#10B981' }}>{fmt(budget * 0.20)}</span>
            </div>
            <div className="progress-bar-wrap" style={{ height: '6px' }}>
              <div className="progress-bar" style={{ width: '20%', background: '#10B981' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Set Budget Input */}
      {editing && (
        <div style={{ marginBottom: '1.25rem', background: 'var(--bg)', borderRadius: '10px', padding: '1rem' }}>
          <label className="form-label">Enter your budget for {currentMonth}</label>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-2)' }}>₹</span>
              <input
                type="number"
                className="form-control"
                style={{ paddingLeft: '1.75rem' }}
                placeholder="e.g. 20000"
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                autoFocus
              />
            </div>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving} style={{ whiteSpace: 'nowrap' }}>
              {saving ? <span className="spinner"></span> : '💾 Save'}
            </button>
          </div>
          {error && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.5rem' }}>⚠️ {error}</div>}
        </div>
      )}

      {budget ? (
        <>
          {/* Budget Numbers Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--primary-light)', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Budget</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{fmt(budget)}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0.75rem', background: '#FEF3C7', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.7rem', color: '#92400E', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Spent</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#92400E' }}>{fmt(spent)}</div>
            </div>
            <div style={{ textAlign: 'center', padding: '0.75rem', background: isOver ? '#FEE2E2' : '#D1FAE5', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.7rem', color: isOver ? '#991B1B' : '#065F46', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{isOver ? 'Over By' : 'Left'}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isOver ? '#EF4444' : '#10B981' }}>
                {isOver ? fmt(Math.abs(remaining)) : fmt(remaining)}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-2)', fontWeight: 500 }}>
                {isOver ? '🚨 Over budget!' : isWarning ? '⚠️ Almost at limit' : '✅ On track'}
              </span>
              <span style={{ fontWeight: 700, color: barColor }}>{percent.toFixed(1)}% used</span>
            </div>
            <div className="progress-bar-wrap" style={{ height: '12px' }}>
              <div className="progress-bar" style={{ width: `${percent}%`, background: barColor, transition: 'width 1s cubic-bezier(0.4,0,0.2,1)' }}></div>
            </div>
            {isOver && (
              <div style={{ marginTop: '0.6rem', background: '#FEE2E2', borderRadius: '8px', padding: '0.5rem 0.75rem', fontSize: '0.82rem', color: '#991B1B', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🚨 You've exceeded your budget by <strong>{fmt(Math.abs(remaining))}</strong>. Consider reviewing your expenses.
              </div>
            )}
          </div>
        </>
      ) : (
        !editing && (
          <div style={{ textAlign: 'center', padding: '1.5rem 1rem', color: 'var(--text-3)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
            <p style={{ fontWeight: 600, color: 'var(--text-2)', marginBottom: '0.25rem' }}>No budget set for this month</p>
            <p style={{ fontSize: '0.85rem' }}>Set a monthly budget to track how much you've spent and what's left.</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setEditing(true)}>
              Set Monthly Budget
            </button>
          </div>
        )
      )}
    </div>
  );
};

// ─── Main Dashboard ────────────────────────────────────────────────
const Dashboard = ({ token }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [successMsg, setSuccessMsg] = useState('');
  const [budget, setBudget] = useState(null);

  const handleDownloadScreenshot = () => {
    window.print();
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/expenses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchExpenses(); }, [token]);

  const handleExpenseAdded = (msg) => {
    fetchExpenses();
    setSuccessMsg(msg || 'Expense added!');
    setTimeout(() => setSuccessMsg(''), 3500);
    setActiveTab('overview');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(prev => prev.filter(e => e.id !== id));
      setSuccessMsg('Expense deleted successfully! 🗑️');
      setTimeout(() => setSuccessMsg(''), 3500);
    } catch (err) { console.error(err); }
  };

  // Derived stats
  const total = useMemo(() => expenses.reduce((s, e) => s + parseFloat(e.amount), 0), [expenses]);

  const thisMonth = useMemo(() => {
    const now = new Date();
    return expenses
      .filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((s, e) => s + parseFloat(e.amount), 0);
  }, [expenses]);

  const highestCat = useMemo(() => {
    const map = {};
    expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + parseFloat(e.amount); });
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0] || ['—', 0];
  }, [expenses]);

  const pieData = useMemo(() => {
    const map = {};
    expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + parseFloat(e.amount); });
    return Object.entries(map).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }));
  }, [expenses]);

  const barData = useMemo(() => {
    const monthMap = {};
    expenses.forEach(e => {
      const d = new Date(e.date);
      const key = d.toLocaleString('default', { month: 'short', year: '2-digit' });
      monthMap[key] = (monthMap[key] || 0) + parseFloat(e.amount);
    });
    return Object.entries(monthMap).slice(-6).map(([month, amount]) => ({ month, amount: parseFloat(amount.toFixed(2)) }));
  }, [expenses]);

  const categoryBreakdown = useMemo(() => {
    const map = {};
    expenses.forEach(e => { map[e.category] = (map[e.category] || 0) + parseFloat(e.amount); });
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [expenses]);

  const categories = ['All', ...new Set(expenses.map(e => e.category))];
  const filteredExpenses = categoryFilter === 'All' ? expenses : expenses.filter(e => e.category === categoryFilter);

  const remaining = budget ? parseFloat(budget) - thisMonth : null;

  return (
    <div id="dashboard-content" style={{ paddingBottom: '3rem', padding: '1rem', background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Toast notification */}
      {successMsg && (
        <div className={`alert ${successMsg.includes('deleted') ? 'alert-error' : 'alert-success'} animate-scale-in`} style={{ position: 'fixed', top: '80px', right: '1.5rem', zIndex: 200, minWidth: '260px', boxShadow: 'var(--shadow-lg)' }}>
          {successMsg}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.25rem' }}>My Dashboard</h2>
          <p style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>Track, analyze, and manage all your rupees</p>
        </div>
        <button onClick={handleDownloadScreenshot} className="btn btn-primary btn-sm print-hide" style={{ borderRadius: '8px', padding: '0.5rem 1rem' }}>
          📄 Save as PDF
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: '1.75rem' }}>
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'add', label: '➕ Add Expense' },
          { id: 'all', label: '📋 All Expenses' },
        ].map(t => (
          <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div className="animate-fade-up">
          {/* Budget Tracker */}
          <BudgetCard token={token} thisMonthSpent={thisMonth} onBudgetChange={setBudget} />

          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#EDE9FE' }}><span style={{ fontSize: '1.3rem' }}>💸</span></div>
              <div className="stat-label">Total Spent (All Time)</div>
              <div className="stat-value">{fmt(total)}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#FEF3C7' }}><span style={{ fontSize: '1.3rem' }}>📅</span></div>
              <div className="stat-label">Spent This Month</div>
              <div className="stat-value" style={{ color: 'var(--accent)' }}>{fmt(thisMonth)}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: remaining !== null && remaining < 0 ? '#FEE2E2' : '#D1FAE5' }}><span style={{ fontSize: '1.3rem' }}>{remaining !== null && remaining < 0 ? '🚨' : '💰'}</span></div>
              <div className="stat-label">Budget Remaining</div>
              <div className="stat-value" style={{ color: remaining !== null && remaining < 0 ? 'var(--danger)' : 'var(--success)', fontSize: '1.5rem' }}>
                {remaining !== null ? fmt(Math.abs(remaining)) + (remaining < 0 ? ' over' : '') : '—'}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#FCE7F3' }}><span style={{ fontSize: '1.3rem' }}>🏆</span></div>
              <div className="stat-label">Top Category</div>
              <div className="stat-value" style={{ fontSize: '1.2rem' }}>{CATEGORY_ICONS[highestCat[0]] || '—'} {highestCat[0]}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" style={{ background: '#DBEAFE' }}><span style={{ fontSize: '1.3rem' }}>🧾</span></div>
              <div className="stat-label">Total Transactions</div>
              <div className="stat-value">{expenses.length}</div>
            </div>
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div className="chart-container">
              <div className="section-title">💰 Spending by Category</div>
              {pieData.length === 0 ? (
                <div className="empty-state"><p>Add expenses to see chart</p></div>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="chart-container">
              <div className="section-title">📈 Monthly Spending Trend</div>
              {barData.length === 0 ? (
                <div className="empty-state"><p>Add expenses to see trend</p></div>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-2)' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--text-2)' }} tickFormatter={(v) => `₹${v}`} />
                    <Tooltip formatter={(v) => fmt(v)} />
                    <Bar dataKey="amount" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Category Breakdown */}
          {categoryBreakdown.length > 0 && (
            <div className="chart-container" style={{ marginBottom: '1.5rem' }}>
              <div className="section-title">🏷️ Category Breakdown</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {categoryBreakdown.map(([cat, amt], i) => (
                  <div key={cat}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{CATEGORY_ICONS[cat]} {cat}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {budget && <span style={{ fontSize: '0.78rem', color: 'var(--text-3)' }}>{((amt / parseFloat(budget)) * 100).toFixed(1)}% of budget</span>}
                        <span style={{ fontWeight: 700, color: COLORS[i % COLORS.length], fontSize: '0.9rem' }}>{fmt(amt)}</span>
                      </div>
                    </div>
                    <div className="progress-bar-wrap">
                      <div className="progress-bar" style={{ width: `${(amt / total) * 100}%`, background: COLORS[i % COLORS.length] }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Transactions */}
          <div className="chart-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div className="section-title" style={{ margin: 0 }}>🕐 Recent Transactions</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('all')}>View all →</button>
            </div>
            <ExpenseList expenses={expenses.slice(0, 5)} onDelete={handleDelete} loading={loading} />
          </div>
        </div>
      )}

      {/* ── ADD EXPENSE TAB ── */}
      {activeTab === 'add' && (
        <div className="animate-fade-up" style={{ maxWidth: '520px' }}>
          {/* Budget reminder if set */}
          {budget && (
            <div style={{
              background: remaining < 0 ? '#FEE2E2' : '#D1FAE5',
              border: `1px solid ${remaining < 0 ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
              borderRadius: '12px',
              padding: '0.9rem 1.1rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{remaining < 0 ? '🚨' : '💰'}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: remaining < 0 ? '#991B1B' : '#065F46' }}>
                  {remaining < 0 ? 'Over Budget!' : `${fmt(remaining)} remaining this month`}
                </div>
                <div style={{ fontSize: '0.78rem', color: remaining < 0 ? '#B91C1C' : '#047857' }}>
                  Spent {fmt(thisMonth)} of {fmt(budget)} budget
                </div>
              </div>
            </div>
          )}
          <ExpenseForm token={token} onExpenseAdded={handleExpenseAdded} budget={budget} />
        </div>
      )}

      {/* ── ALL EXPENSES TAB ── */}
      {activeTab === 'all' && (
        <div className="animate-fade-up">
          <div className="chart-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div className="section-title" style={{ margin: 0 }}>📋 All Transactions</div>
              <span style={{ fontWeight: 600, color: 'var(--text-2)', fontSize: '0.875rem' }}>
                Total: <span style={{ color: 'var(--primary)' }}>{fmt(total)}</span>
              </span>
            </div>
            <div className="filter-bar">
              {categories.map(c => (
                <button key={c} className={`filter-chip ${categoryFilter === c ? 'active' : ''}`} onClick={() => setCategoryFilter(c)}>
                  {c !== 'All' ? CATEGORY_ICONS[c] + ' ' : ''}{c}
                </button>
              ))}
            </div>
            <div style={{ color: 'var(--text-3)', fontSize: '0.8rem', marginBottom: '1rem' }}>
              Showing {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''}
              {categoryFilter !== 'All' && ` in ${categoryFilter}`}
              {categoryFilter !== 'All' && filteredExpenses.length > 0 && (
                <span> · Total: <strong>{fmt(filteredExpenses.reduce((s, e) => s + parseFloat(e.amount), 0))}</strong></span>
              )}
            </div>
            <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} loading={loading} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
