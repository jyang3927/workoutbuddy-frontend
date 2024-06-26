import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { LoginPage } from "./login/components/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import { TestingComponent } from "./testing/TestingComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./homePage/components/HomePage";
import { AuthenticatedRoute } from "./helper/AuthenticatedRoute";
import { FavoriteExercises } from "./favoritesPage/components/FavoriteExercises";
import { AuthBar } from "./login/components/AuthBar";
import MyCalendar from "./calendarPage/MyCalendar";
import { AddExerciseForm } from "./addExercise/components/AddExerciseForm";
import AutocompleteTest from "./testing/AutocompleteTest";
import { UserActivityProvider } from "./context/UserActivityContext";
import { Entries } from "./addExercise/components/Entries";
import DateCalendarServerRequest from "./calendarPage/MyCalendar";
import { UserActivityPerDate } from "./datePage/components/UserActivityPerDate";
import { TestingExerciseService } from "./testing/TestingExerciseService";
function App() {
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    // <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthBar />} />
        <Route
          path="/home"
          element={
            <AuthenticatedRoute authenticationPath={"/login"}>
              <FavoriteExercises />
            </AuthenticatedRoute>
          }
        />
        <Route path="/calendar" element={<MyCalendar />} />
        {/* <Route path="/userActivity/:date" element={<RoutinePerDate />} /> */}
        <Route path="/favorites/routines" element={<TestingExerciseService/>} />
        <Route path="/favorites/exercises" element={<Entries />} />
        {/* <Route path="/calendar/day/:date" element={<ExercisesPerDate />} /> */}
      </Routes>
    </BrowserRouter>
    // </AuthProvider>
    // {/* </LocalizationProvider> */}
  );
}
export default App;
