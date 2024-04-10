import * as React from 'react'; 
import Badge from '@mui/material/Badge'; 
import {PickersDay, PickersDayProps} from '@mui/x-date-pickers/PickersDay'; 
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useUserActivity } from '../hooks/useUserActivity';
import { ExercisesPerDate } from '../datePage/components/ExercisesPerDate';
import dayjs from 'dayjs';


export default function MyCalendar() {

  const {userActivity, getUserActivityForMonth} = useUserActivity(); 

  let currentDay:Date = new Date(); 

  const [day, setDay] = React.useState<Date>(currentDay);  
  const [selectedMonth, setSelectedMonth] = React.useState<Partial<Date>>(currentDay.getMonth()); 
  const [page, setPage] = React.useState<number>(0); 

  console.log("day:", day)
  // console.log("monthMUI", day.getMonth())

  React.useEffect(() => {
    getUserActivityForMonth(day)
  }, [selectedMonth])

  function handleDateChange(newValue:Date) {
    setDay(newValue); 
    setSelectedMonth(day.getMonth() + 1)
    console.log("selectedMonth", selectedMonth)
    console.log("User Activity after day change", userActivity)
  }

  // function monthActivity



  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}> 
        <DateCalendar value={dayjs(day)} onChange={(newValue) => handleDateChange(newValue.$d)}/>
        <ExercisesPerDate day = {day}/>
      </LocalizationProvider>
      <div> 
      </div>
    </div>
  )
}