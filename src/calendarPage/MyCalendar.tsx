import * as React from 'react'; 
import Badge from '@mui/material/Badge'; 
import {PickersDay, PickersDayProps} from '@mui/x-date-pickers/PickersDay'; 
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useUserActivity } from '../hooks/useUserActivity';
import { UserActivityPerDate } from '../datePage/components/UserActivityPerDate';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { AddNewUserActivity } from '../formsComponents/AddNewUserActivity';
import { monthsToYears } from 'date-fns';
import '../styles/myCalendar.css'
import { AuthBar } from '../login/components/AuthBar';
import { Link } from 'react-router-dom';

export default function MyCalendar() {

  const {getUserActivityForMonth, setDateSelected, dateSelected} = useUserActivity(); 

  const updateUserMonthSelected = async(day:Date) => {
    await getUserActivityForMonth(day); 
    setDateSelected(day);
  }

  function handleDateChange(newValue:Date) {
    if(newValue.getMonth() !== dateSelected.getMonth()){
      updateUserMonthSelected(newValue);
    }else {
      setDateSelected(newValue)
    }
  }

  return (
    <div className="columnFlex">
      <div className="NavBar">
          <Link to="/">
            <Button>Home</Button>
          </Link>
          <Link to="/calendar">
            <Button className="Nav">Calendar</Button>
          </Link>
          <Link to="/favorites/routines">
            <Button>My Routines</Button>
          </Link>
          <Link to="/favorites/exercises">
            <Button>My Exercises</Button>
          </Link>
      </div>
      <div>
        <div className="MyCalendar">
          <div className="calendarAndForm">
            <h1 className="calendarTitle">{dateSelected.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}</h1>
            <div className="calendarComponent">
              <LocalizationProvider dateAdapter={AdapterDayjs}> 
                <DateCalendar onChange={(newValue) => handleDateChange(newValue.$d)}/>
              </LocalizationProvider>
            </div>
            {/* <div className="AddActivityComponent"> 
              {/* <Button variant="contained">Add Workout</Button> */}
              {/* <AddNewUserActivity/>
            </div> */} 
          </div>
          <div className="ActivityDisplay">
            <UserActivityPerDate/>
          </div>
        </div>
      </div>
    </div>
  )
}