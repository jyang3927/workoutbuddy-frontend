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
  getDayActivity: (daySelected: Date) => UserActivity;
  getUserActivity:(month:Date) => UserActivity[]; 
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
          console.log("error line 46")
          console.log(error);
        });

        console.log(userActivity)
    }
  }, [user]);

  console.log(userActivity);

  const getUserActivityForMonth = (month:Date) =>{
    getUserActivityByDate(month.getFullYear(), month.getMonth(), null)
    .then((res) => {
      setUserActivity(res)
    })
    .catch((error: any) => {
      console.log("error line 46")
      console.log(error);
    });
  }

  const getDayActivity = (daySelected: Date): => {
    if (userActivity) {
      console.log(userActivity)
      return userActivity.find((day) => {
        return day.date.getTime() === daySelected.getTime();
      });
      // try{
      //   let response = getUserActivityByDate(null, null, day)
      //   return response 
      // }catch(error:any){
      //   console.log("error here")
      // }
    } else {
      console.log("line67")
      return null;
    }
  };
  
  return (
    <UserActivityContext.Provider value={{ userActivity, getDayActivity, getUserActivityForMonth}}>
      {children}
    </UserActivityContext.Provider>
  );
};
