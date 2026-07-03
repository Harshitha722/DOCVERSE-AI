import React, { useState } from 'react';
import api from '../services/api';

const AiAssistant = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAction = async (actionPath) => {
    setLoading(true);
    try {
      const res = await api.post(`/ai/${actionPath}`, { text });
      setResult(res.data.result);
    } catch (error) {
      console.error(error);
      alert('Error processing request');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="gradient-text">AI Assistant</h1>
      <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Paste text here to summarize, rewrite, or analyze..."
          style={{ width: '100%', minHeight: '150px', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}
        />
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <button onClick={() => handleAction('summarize')} style={btnStyle} disabled={loading || !text}>Summarize</button>
          <button onClick={() => handleAction('rewrite')} style={btnStyle} disabled={loading || !text}>Rewrite</button>
          <button onClick={() => handleAction('grammar')} style={btnStyle} disabled={loading || !text}>Fix Grammar</button>
          <button onClick={() => handleAction('questions')} style={btnStyle} disabled={loading || !text}>Generate Questions</button>
        </div>

        {loading && <p>Processing...</p>}
        {result && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--bg-color)', borderRadius: '8px' }}>
            <h3>Result:</h3>
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

const btnStyle = {
  padding: '0.5rem 1rem',
  background: 'var(--card-bg)',
  border: '1px solid var(--color-primary)',
  color: 'var(--color-primary)',
  borderRadius: '8px',
  fontWeight: '600'
};

export default AiAssistant;
