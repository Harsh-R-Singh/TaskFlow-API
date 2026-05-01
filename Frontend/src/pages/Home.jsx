import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="container animate-fade-in">
      <nav className="glass navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layers className="text-primary" size={32} color="#3b82f6" />
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>TaskFlow API</h2>
        </div>
        <div className="nav-links">
          <Link to="/login" className="btn glass" style={{ background: 'transparent' }}>Log In</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </nav>

      <main style={{ textAlign: 'center', marginTop: '6rem' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
          Scalable Backend,<br />Beautifully Tested.
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
          Experience a robust REST API powered by Node.js, Express, and MongoDB. 
          Complete with JWT Authentication and Role-Based Access Control.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '4rem' }}>
          <div className="glass" style={{ padding: '2rem', maxWidth: '300px', textAlign: 'left' }}>
            <ShieldCheck size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h3>Secure Auth</h3>
            <p style={{ color: '#94a3b8' }}>Industry standard JWT authentication with hashed passwords.</p>
          </div>
          <div className="glass" style={{ padding: '2rem', maxWidth: '300px', textAlign: 'left' }}>
            <Layers size={40} color="#3b82f6" style={{ marginBottom: '1rem' }} />
            <h3>RBAC</h3>
            <p style={{ color: '#94a3b8' }}>Distinct User and Admin roles for controlled resource access.</p>
          </div>
          <div className="glass" style={{ padding: '2rem', maxWidth: '300px', textAlign: 'left' }}>
            <Zap size={40} color="#8b5cf6" style={{ marginBottom: '1rem' }} />
            <h3>Fast CRUD</h3>
            <p style={{ color: '#94a3b8' }}>Optimized queries for seamless entity management.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
