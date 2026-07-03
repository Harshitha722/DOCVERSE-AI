import React, { useState } from 'react';
import api from '../services/api';

const AiGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [format, setFormat] = useState('md');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await api.post('/ai/generate', { prompt, format });
      setResult(res.data.document);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.message || 'Error generating document';
      alert(`Error: ${msg}`);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="gradient-text">AI Document Generator</h1>
      <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
        <textarea 
          value={prompt} 
          onChange={(e) => setPrompt(e.target.value)} 
          placeholder="What kind of document do you want to create?"
          style={{ width: '100%', minHeight: '150px', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}
        />
        <select value={format} onChange={(e) => setFormat(e.target.value)} style={{ padding: '0.5rem', marginBottom: '1rem', marginRight: '1rem' }}>
          <option value="md">Markdown</option>
          <option value="txt">Text</option>
          <option value="html">HTML</option>
        </select>
        <button 
          onClick={handleGenerate} 
          disabled={loading || !prompt}
          style={{ padding: '0.5rem 1.5rem', background: 'var(--color-primary)', color: 'white', borderRadius: '8px' }}
        >
          {loading ? 'Generating...' : 'Generate Document'}
        </button>

        {result && (
          <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-color)', borderRadius: '8px' }}>
            <h3>{result.title}</h3>
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>{result.content}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiGenerator;
