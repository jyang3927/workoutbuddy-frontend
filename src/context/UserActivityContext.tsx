import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { UserActivity } from "../models/UserActivity";
import { getUserActivityByDate } from "../services/dataBase/dbUserActivityService";
import { AuthContext } from "./AuthContext";
import { useAuth } from "../hooks/useAuth";

interface UserActivityContextType {
  getDayActivity: (date: Date) => UserActivity[];
  userActivity: UserActivity[] | null;
}

export const UserActivityContext = createContext<
  UserActivityContextType | undefined
>(undefined);

interface UserActivityProviderProps {
  children: ReactNode;
}

export const UserActivityProvider = ({
  children,
}: UserActivityProviderProps) => {
  const [userActivity, setUserActivity] = useState<UserActivity[] | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      console.log("yes");
      getUserActivityByDate(
        new Date().getFullYear(),
        new Date().getMonth(),
        null
      )
        .then((res) => {
          console.log(res);
          setUserActivity(res);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [user]);
  console.log(userActivity);
  const getDayActivity = (date: Date) => {
    if (userActivity) {
      return userActivity?.filter((day) => {
        return day.date.getTime() === date.getTime();
      });
    } else {
      return [];
    }
  };
  return (
    <UserActivityContext.Provider value={{ userActivity, getDayActivity }}>
      {children}
    </UserActivityContext.Provider>
  );
};
