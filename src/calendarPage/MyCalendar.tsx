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

export default function MyCalendar() {

  const {getUserActivityForMonth, setDateSelected, dateSelected} = useUserActivity(); 

  const updateUserMonthSelected = async(day:Date) => {
    await getUserActivityForMonth(day); 
    setDateSelected(day);
  }

  function handleDateChange(newValue:Date) {
    updateUserMonthSelected(newValue);
  }

  return (
    <div className="MyCalendar">
      <div className="calendarAndForm">
      <h1 className="calendarTitle">CALENDAR</h1>
        <div className="calendarComponent">
          <LocalizationProvider dateAdapter={AdapterDayjs}> 
            <DateCalendar onChange={(newValue) => handleDateChange(newValue.$d)}/>
          </LocalizationProvider>
        </div>
        <div className="AddActivityComponent"> 
          {/* <Button variant="contained">Add Workout</Button> */}
          <AddNewUserActivity/>
        </div>
      </div>
      <div className="ActivityDisplay">
        <UserActivityPerDate/>
      </div>
    </div>
  )
}