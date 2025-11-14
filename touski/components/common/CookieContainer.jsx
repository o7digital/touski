"use client";

import { useState, useEffect } from "react";

export default function CookieContainer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShow(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderTop: '1px solid #e5e5e5',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
        padding: '1.5rem 2rem',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}
    >
      <div style={{ flex: '1 1 300px', maxWidth: '800px' }}>
        <p style={{ margin: 0, color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser le trafic du site et personnaliser le contenu. 
          En continuant à naviguer, vous acceptez notre utilisation des cookies comme indiqué dans notre{' '}
          <a href="/terms" style={{ color: '#FF9445', textDecoration: 'underline' }}>
            Politique de confidentialité
          </a>
          .
        </p>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
        <button
          onClick={declineCookies}
          style={{
            padding: '0.6rem 1.5rem',
            border: '1px solid #ddd',
            backgroundColor: '#fff',
            color: '#666',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
        >
          Refuser
        </button>
        <button
          onClick={acceptCookies}
          style={{
            padding: '0.6rem 1.5rem',
            border: 'none',
            backgroundColor: '#FF9445',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ff8030'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#FF9445'}
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
