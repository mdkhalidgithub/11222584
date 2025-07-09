import React from 'react';
import URLShortenerForm from '../components/URLShortenerForm';
import URLList from '../components/URLList';

export default function ShortenerPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shorten Your URL</h2>
      <URLShortenerForm />
      <URLList />
    </div>
  );
}
