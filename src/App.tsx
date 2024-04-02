import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginPage } from './login/components/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { TestingComponent } from './testing/TestingComponent'

function App() {
  return (
    <div>
      <AuthProvider>
    <div className="App">
      <LoginPage></LoginPage>
    </div>
    </AuthProvider>
    <TestingComponent/>
    </div>
  

  );
}

export default App;
