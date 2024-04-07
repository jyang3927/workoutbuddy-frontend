import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserActivityContext } from "../../context/UserActivityContext";
import { useAuth } from "../../hooks/useAuth";
import { useUserActivity } from "../../hooks/useUserActivity";

export function ExercisesPerDate() {
  const date = useParams().date;
  const { getDayActivity, userActivity } = useUserActivity();
  useEffect(() => {
    if (date) {
      getDayActivity(new Date(date));
    }
  }, [date]);
  return <div className="ExercisesPerDate"></div>;
}
