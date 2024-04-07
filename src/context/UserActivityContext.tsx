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
  getDayActivity: (date: Date) => void;
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
      getUserActivityByDate(
        new Date().getFullYear(),
        new Date().getMonth(),
        null
      )
        .then((res) => {
          setUserActivity(res);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [user]);
  const getDayActivity = (date: Date) => {
    userActivity?.filter();
  };
  return (
    <UserActivityContext.Provider value={{ userActivity, getDayActivity }}>
      {children}
    </UserActivityContext.Provider>
  );
};
