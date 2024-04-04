import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginPage } from './login/components/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { TestingComponent } from './testing/TestingComponent';
import { UserProfileProvider } from './context/UsersProfileContext';

function App() {
  return (
    <div>
      <AuthProvider>
        <UserProfileProvider>
      <div className="App">
        <LoginPage></LoginPage>
      </div>
      </UserProfileProvider>
    </AuthProvider>
    <TestingComponent/>
    </div>
  

  );
}

export default App;
