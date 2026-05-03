import React from 'react';

const CATEGORY_ICONS = { Food: '🍔', Coffee: '☕', Tea: '🍵', Travel: '✈️', Cab: '🚕', Shopping: '🛍️', Rent: '🏠', Bills: '💡', Entertainment: '🎬', Health: '🏥', Others: '📦' };
const CATEGORY_BG = { Food: '#FEF3C7', Coffee: '#FFEDD5', Tea: '#D1FAE5', Travel: '#D1FAE5', Cab: '#FEF08A', Shopping: '#FCE7F3', Rent: '#DBEAFE', Bills: '#EDE9FE', Entertainment: '#FEE2E2', Health: '#FECACA', Others: '#F3F4F6' };
const CATEGORY_COLOR = { Food: '#92400E', Coffee: '#9A3412', Tea: '#065F46', Travel: '#065F46', Cab: '#A16207', Shopping: '#9D174D', Rent: '#1E40AF', Bills: '#5B21B6', Entertainment: '#991B1B', Health: '#B91C1C', Others: '#374151' };

const formatDate = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const fmt = (n) => '₹' + parseFloat(n).toLocaleString('en-IN');

const ExpenseList = ({ expenses, onDelete, loading }) => {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-3)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
        <p>Loading expenses...</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧾</div>
        <p style={{ fontWeight: 600, color: 'var(--text-2)', marginBottom: '0.35rem' }}>No expenses found</p>
        <p style={{ fontSize: '0.875rem' }}>Add your first expense to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-row animate-fade-in">
          <div className="expense-row-left">
            <div className="expense-cat-icon" style={{ background: CATEGORY_BG[expense.category] || '#F3F4F6' }}>
              {CATEGORY_ICONS[expense.category] || '📦'}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`badge badge-${expense.category?.toLowerCase()}`}>
                  {expense.category}
                </span>
              </div>
              <div className="expense-desc">{expense.description || 'No description'}</div>
              <div className="expense-meta">{formatDate(expense.date)}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
            <div className="expense-amount">{fmt(expense.amount)}</div>
            <button
              onClick={() => onDelete(expense.id)}
              className="btn btn-danger btn-sm"
              style={{ padding: '0.35rem 0.7rem', borderRadius: '8px' }}
              title="Delete"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
