import * as React from 'react'; 
import Badge from '@mui/material/Badge'; 
import {PickersDay, PickersDayProps} from '@mui/x-date-pickers/PickersDay'; 
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useUserActivity } from '../hooks/useUserActivity';
import { ExercisesPerDate } from '../datePage/components/ExercisesPerDate';


export default function MyCalendar() {

  const {userActivity} = useUserActivity(); 

  let currentDay:Date = new Date(); 

  const [day, setDay] = React.useState<Date>(currentDay);  

  console.log(day)
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}> 
        <DateCalendar onChange={(newValue) => setDay(newValue)}/>
        <ExercisesPerDate day = {day}/>
      </LocalizationProvider>
      <div> 
      </div>
    </div>
  )
}