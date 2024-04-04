import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginPage } from './login/components/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { TestingComponent } from './testing/TestingComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './homePage/components/HomePage';
import { AuthenticatedRoute } from './helper/AuthenticatedRoute';
import { FavoriteExercises } from './favoritesPage/components/FavoriteExercises';
import { AuthBar } from './login/components/AuthBar';
import { ExerciseList } from './favoritesPage/components/ExerciseList';
import { RoutinesList } from './favoritesPage/components/RoutinesList';
import MyCalendar from './calendar/MyCalendar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<AuthBar/>}/>
          <Route path="/home" element={<AuthenticatedRoute authenticationPath={'/login'}><FavoriteExercises /></AuthenticatedRoute>} />
          <Route path="/calendar" element={<MyCalendar />}/>
          <Route path="/favorites/routines" element={<RoutinesList />}/>
          <Route path="/favorites/exercises" element={<TestingComponent />}/>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  );
}
// <div>
    //   <AuthProvider>
    // <div className="App">
    //   <LoginPage></LoginPage>
    // </div>
    // </AuthProvider>
    // <TestingComponent/>
    // </div>

export default App;
