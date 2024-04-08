import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserActivityContext } from "../../context/UserActivityContext";
import { useAuth } from "../../hooks/useAuth";
import { useUserActivity } from "../../hooks/useUserActivity";
import { UserActivity } from "../../models/UserActivity";

export function ExercisesPerDate() {
  const date = useParams().date;
  const { getDayActivity, userActivity } = useUserActivity();
  const [dayActivity, setDayActivity] = useState<UserActivity[] | null>(null);
  useEffect(() => {
    if (date) {
      setDayActivity(getDayActivity(new Date(date)));
      getDayActivity(new Date(date));
      console.log(dayActivity, new Date(date));
    }
  }, [date]);

  return <div className="ExercisesPerDate"></div>;
}
