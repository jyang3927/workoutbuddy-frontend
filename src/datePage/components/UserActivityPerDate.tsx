import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserActivityContext } from "../../context/UserActivityContext";
import { useAuth } from "../../hooks/useAuth";
import { useUserActivity } from "../../hooks/useUserActivity";
import { UserActivity } from "../../models/UserActivity";
import { RoutineForDate } from "./RoutineForDate";
import '../../styles/userActivityPerDate.css'
import { AddNewUserActivity } from "../../formsComponents/AddNewUserActivity";

export function UserActivityPerDate() {
  const { getDayActivity,dateSelected, userActivity } = useUserActivity();

  const [dayActivity, setDayActivity] = useState<UserActivity| null>(null);

  useEffect(() => {
      getActivityForDay(dateSelected)
    }, [dateSelected, userActivity, dayActivity]);

  const getActivityForDay =  (day:Date) => {
    let response = getDayActivity(day); 
    if (response!==undefined){
      setDayActivity(response)
    }else {
      setDayActivity(null)
    }
  }

  if(dayActivity){
    console.log("DAYSELECTED", dayActivity)
    console.log("IFDAYACT",dayActivity.routines)
  }
 

  return (
  <div className="ExercisesPerDate">
    <div className="MainInfoDisplay">
      <div className="DateSelected">Activity Log</div>
      <div className="InformationBox">
        <div className="RoutineInfoBox">
          {dayActivity !== null && 
            dayActivity.routines.map((routine) => <RoutineForDate routine={routine}/>) 
          }
        </div>
        <div className="AddLog">
          <AddNewUserActivity currentUserActivity = {dayActivity}/>
        </div>
      </div>
    </div>
  </div>
  );
}
