import React, { useState } from 'react';
import api from '../services/api';

const Converter = () => {
  const [file, setFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState('pdf');
  const [loading, setLoading] = useState(false);
  const [fileExt, setFileExt] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState('');

  const supportedConversions = {
    md: ['html'],
    html: ['md', 'docx'],
    docx: ['html', 'pdf'],
    txt: ['pdf']
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setDownloadUrl(null);
      setError('');

      const ext = selectedFile.name.split('.').pop().toLowerCase();
      setFileExt(ext);
      
      const available = supportedConversions[ext];
      if (available && available.length > 0) {
        setTargetFormat(available[0]);
      } else {
        setError(`Files with extension .${ext} are not supported.`);
      }
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setDownloadUrl(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetFormat', targetFormat);

    try {
      const res = await api.post('/conversions/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setDownloadUrl(res.data.downloadUrl);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Error converting file');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="gradient-text">Universal File Converter</h1>
      <p style={{ marginBottom: '2rem', opacity: 0.8 }}>
        Upload your document and seamlessly convert it to a different format. 
        Supported: MD ↔ HTML, DOCX ↔ HTML, DOCX ➝ PDF, TXT ➝ PDF.
      </p>

      <div className="glass-panel" style={{ padding: '2rem', maxWidth: '600px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Upload File
          </label>
          <input 
            type="file" 
            onChange={handleFileChange}
            style={{ 
              display: 'block', 
              width: '100%', 
              padding: '1rem',
              border: '2px dashed var(--border-color)',
              borderRadius: '8px',
              background: 'var(--bg-color)',
              cursor: 'pointer'
            }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Convert To
          </label>
          <select 
            value={targetFormat} 
            onChange={(e) => setTargetFormat(e.target.value)}
            style={{ 
              padding: '0.75rem', 
              width: '100%', 
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)',
              color: 'var(--text-color)'
            }}
          >
            {(fileExt ? supportedConversions[fileExt] || [] : ['pdf', 'docx', 'html', 'md']).map(fmt => (
              <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {error && (
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', borderRadius: '8px', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <button 
          onClick={handleConvert}
          disabled={!file || loading}
          style={{ 
            width: '100%',
            padding: '1rem', 
            background: 'var(--color-primary)', 
            color: 'white', 
            borderRadius: '8px',
            fontWeight: 600,
            opacity: (!file || loading) ? 0.7 : 1,
            cursor: (!file || loading) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Converting...' : 'Convert File'}
        </button>

        {downloadUrl && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--color-success)', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--color-success)', marginBottom: '1rem' }}>Conversion Successful!</h3>
            <a 
              href={`http://localhost:5000${downloadUrl}`} 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: 'var(--color-success)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 600
              }}
              download
            >
              Download Converted File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Converter;
