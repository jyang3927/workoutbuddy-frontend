import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserActivityContext } from "../../context/UserActivityContext";
import { useAuth } from "../../hooks/useAuth";
import { useUserActivity } from "../../hooks/useUserActivity";
import { UserActivity } from "../../models/UserActivity";
import { RoutineForDate } from "./RoutineForDate";

export function ExercisesPerDate() {
  const { getDayActivity,dateSelected } = useUserActivity();

  const [dayActivity, setDayActivity] = useState<UserActivity| null>(null);

  useEffect(() => {
      getActivityForDay(dateSelected)
    }, [dateSelected]);

  const getActivityForDay =  (day:Date) => {
    let response = getDayActivity(day); 
    if (response!==undefined){
      setDayActivity(response)
    }else {
      setDayActivity(null)
    }
  }

  if(dayActivity){
    console.log("IFDAYACT",dayActivity.routines)
  }
 

  return (
  <div className="ExercisesPerDate">
    <div>
      <div>{dateSelected.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}</div>
      {dayActivity !== null && 
        dayActivity.routines.map((routine) => <RoutineForDate routineId={routine}/>) 
      }
    </div>
  </div>
  );
}
