import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserActivityContext } from "../../context/UserActivityContext";
import { useAuth } from "../../hooks/useAuth";
import { useUserActivity } from "../../hooks/useUserActivity";
import { UserActivity } from "../../models/UserActivity";

interface ExercisesPerDateProps{
  day: Date; 
}

export function ExercisesPerDate({day}: ExercisesPerDateProps) {
  // const date = useParams().date;
  const { getDayActivity, userActivity, getUserActivityForMonth } = useUserActivity();

  const [dayActivity, setDayActivity] = useState<UserActivity[]| null>(null);

  // console.log(dayActivity)

  useEffect(() => {
      getMonthInfo(day)
      // getDayActivity(day);
      // console.log(dayActivity, day);
    }, [day]);

  const getMonthInfo = (day:Date) => {
    let response = getUserActivityForMonth(day); 
    // setDayActivity(response)
  }
  return (
  <div className="ExercisesPerDate"></div>
  );
}
