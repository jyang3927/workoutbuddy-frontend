import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginPage } from './login/components/LoginPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
    <div className="App">
      <LoginPage></LoginPage>
    </div>
    </AuthProvider>
  );
}

export default App;
