import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORY_ICONS = { Food: '🍔', Rent: '🏠', Travel: '✈️', Shopping: '🛍️', Bills: '💡', Entertainment: '🎬', Other: '📦' };
const CATEGORY_CLASSES = { Food: 'badge-food', Rent: 'badge-rent', Travel: 'badge-travel', Shopping: 'badge-shopping', Bills: 'badge-bills', Entertainment: 'badge-entertainment', Other: 'badge-other' };

const LandingPage = () => {
  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span>💰</span> SpendSmart
          <span className="brand-dot"></span>
        </div>
        <div className="navbar-nav">
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/register" className="btn btn-primary">Get Started Free →</Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="container">
        <div className="landing-hero animate-fade-up">
          <div className="hero-badge">
            ✨ Smart Expense Tracking with AI-powered NLP
          </div>
          <h1 className="heading-display" style={{ maxWidth: '720px', margin: '0 auto 1.25rem' }}>
            Track Every Rupee,<br/><span>Effortlessly.</span>
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '1.15rem', maxWidth: '560px', margin: '0 auto' }}>
            Just type "Spent ₹500 on pizza" and we'll handle the rest. Categorize, analyze, and visualize your spending in seconds.
          </p>

          <div className="hero-cta-group">
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Tracking Free
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              Login to Account
            </Link>
          </div>

          <div className="hero-features-list">
            {['No credit card required', 'Rupee-native', 'Charts & Insights', 'NLP Input'].map(f => (
              <div key={f} className="hero-feature-item">
                <span className="check">✓</span> {f}
              </div>
            ))}
          </div>
        </div>

        {/* MOCK DASHBOARD PREVIEW */}
        <div style={{ background: 'white', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-xl)', padding: '1.5rem', marginBottom: '5rem', maxWidth: '900px', margin: '0 auto 5rem' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {[
              { icon: '💸', label: 'Total Spent', val: '₹48,250', color: '#7C3AED', bg: '#EDE9FE' },
              { icon: '📊', label: 'This Month', val: '₹12,800', color: '#F59E0B', bg: '#FEF3C7' },
              { icon: '✅', label: 'Budget Left', val: '₹7,200', color: '#10B981', bg: '#D1FAE5' },
              { icon: '🏷️', label: 'Categories', val: '6 Active', color: '#EC4899', bg: '#FCE7F3' },
            ].map(s => (
              <div key={s.label} style={{ flex: '1', minWidth: '140px', background: s.bg, borderRadius: '12px', padding: '1rem' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{s.icon}</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-2)' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--bg)', borderRadius: '10px', padding: '1rem' }}>
            {[
              { cat: 'Food', desc: 'Zomato order - Biryani', amt: '₹380', date: 'Today' },
              { cat: 'Travel', desc: 'Ola cab to office', amt: '₹220', date: 'Yesterday' },
              { cat: 'Shopping', desc: 'Amazon - Headphones', amt: '₹1,999', date: '2 days ago' },
            ].map((e, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{CATEGORY_ICONS[e.cat]}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{e.desc}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{e.date}</div>
                  </div>
                </div>
                <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{e.amt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="section-header">
          <h2>Trusted by smart spenders</h2>
          <p>Helping thousands of Indians track their money wisely</p>
        </div>
        <div className="stats-row" style={{ marginBottom: '5rem' }}>
          {[
            { num: '50K+', label: 'Expenses Tracked' },
            { num: '₹2Cr+', label: 'Money Managed' },
            { num: '6', label: 'Smart Categories' },
            { num: '100%', label: 'Free to Use' },
          ].map(s => (
            <div key={s.label} className="stats-item">
              <div className="stats-number">{s.num}</div>
              <div className="stats-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="section-header">
          <h2>Everything you need to manage money</h2>
          <p>Powerful features designed for everyday Indian spending habits</p>
        </div>
        <div className="features-grid" style={{ marginBottom: '5rem' }}>
          {[
            { icon: '🧠', title: 'Smart NLP Input', desc: 'Just type naturally — "Paid ₹1200 rent today" — and we extract, categorize, and save it automatically.', color: '#EDE9FE' },
            { icon: '📊', title: 'Visual Charts', desc: 'See your spending breakdown with interactive pie charts and monthly bar charts. Understand your habits visually.', color: '#FEF3C7' },
            { icon: '🏷️', title: 'Auto Categorization', desc: 'Food, Rent, Travel, Shopping, Bills, Entertainment — expenses get sorted automatically, no manual tagging.', color: '#D1FAE5' },
            { icon: '🔍', title: 'Filter & Search', desc: 'Filter expenses by category or date range. Find any transaction in seconds.', color: '#FCE7F3' },
            { icon: '🔐', title: 'Secure & Private', desc: 'Your data is protected with bcrypt password hashing and JWT authentication. Only you see your data.', color: '#DBEAFE' },
            { icon: '📱', title: 'Fully Responsive', desc: 'Works beautifully on desktop, tablet, and mobile. Track expenses anywhere, anytime.', color: '#FEE2E2' },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon" style={{ background: f.color }}>{f.icon}</div>
              <h3 style={{ marginBottom: '0.6rem', fontSize: '1.1rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* HOW IT WORKS */}
        <div className="section-header">
          <h2>How it works</h2>
          <p>Three simple steps to get started</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '5rem' }}>
          {[
            { step: '01', icon: '✍️', title: 'Create Account', desc: 'Register in seconds with your name, email and password. No credit card needed.' },
            { step: '02', icon: '💬', title: 'Log Expenses', desc: 'Type naturally or use the manual form to add your daily expenses in rupees.' },
            { step: '03', icon: '📈', title: 'Get Insights', desc: 'View charts, filter by category, and understand exactly where your money goes.' },
          ].map((s, i) => (
            <div key={s.step} style={{ background: 'white', borderRadius: '16px', padding: '2rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1.25rem', fontSize: '3rem', fontWeight: 900, color: 'var(--primary)', opacity: 0.07, lineHeight: 1 }}>{s.step}</div>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{s.icon}</div>
              <h3 style={{ marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ color: 'var(--text-2)', fontSize: '0.9rem' }}>{s.desc}</p>
              {i < 2 && (
                <div style={{ position: 'absolute', right: '-1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.5rem', color: 'var(--text-3)', zIndex: 2, display: 'none' }}>→</div>
              )}
            </div>
          ))}
        </div>

        {/* CTA BANNER */}
        <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #EC4899 100%)', borderRadius: '24px', padding: '4rem 2rem', textAlign: 'center', color: 'white', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to take control of your money?</h2>
          <p style={{ opacity: 0.85, marginBottom: '2rem' }}>Join thousands of smart spenders tracking every rupee with SpendSmart.</p>
          <Link to="/register" className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700, padding: '0.9rem 2.5rem', fontSize: '1rem' }}>
            Create Free Account →
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div>© 2025 SpendSmart — Track every rupee, every day.</div>
      </footer>
    </div>
  );
};

export default LandingPage;
