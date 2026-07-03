import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AiGenerator from './pages/AiGenerator';
import Converter from './pages/Converter';
import Editor from './pages/Editor';
import AiAssistant from './pages/AiAssistant';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/generator" element={<AiGenerator />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/assistant" element={<AiAssistant />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
