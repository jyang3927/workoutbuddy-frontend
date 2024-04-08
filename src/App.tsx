
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
import { ExerciseList } from "./favoritesPage/components/ExerciseList";
import { RoutinesList } from "./favoritesPage/components/RoutinesList";
import MyCalendar from "./calendar/MyCalendar";
import {AddExerciseForm} from "./addExercise/components/AddExerciseForm";
import AutocompleteTest from "./testing/AutocompleteTest";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { RoutinePerDate } from "./routinePerDate/components/RoutinePerDate";
import { UserActivityProvider } from "./context/UserActivityContext";
import { Entries } from "./addExercise/components/Entries";
import DateCalendarServerRequest from "./calendar/MyCalendar";
function App() {
  return (
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    // <AuthProvider>
    //   <UserActivityProvider>
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
        <Route path="/calendar" element={<DateCalendarServerRequest />} />
        <Route path="/userActivity/:date" element={<RoutinePerDate />} />
        <Route path="/favorites/routines" element={<TestingComponent />} />
        <Route path="/favorites/exercises" element={<Entries />} />
      </Routes>
    </BrowserRouter>
    //   </UserActivityProvider>
    // </AuthProvider>
    // {/* </LocalizationProvider> */}
  ) 
}
export default App;
