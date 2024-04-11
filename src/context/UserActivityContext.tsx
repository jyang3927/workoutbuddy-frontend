import {
  ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";
import { UserActivity } from "../models/UserActivity";
import { getUserActivityByDate } from "../services/dataBase/dbUserActivityService";
import { useAuth } from "../hooks/useAuth";
import { Exercise } from "../models/Exercise";
import { Set } from "../models/Set";

interface UserActivityContextType {
  getDayActivity: (daySelected: Date) => UserActivity|undefined;
  getUserActivityForMonth:(monthSelected:Date) => Promise<UserActivity[]>; 
  userActivity: UserActivity[] | null;  
  dateSelected: Date; 
  setDateSelected:(date:Date) => void; 

  // TESTING 
  // updateExOrSet: Exercise | Set; 
}

export const UserActivityContext = createContext<UserActivityContextType | undefined>(undefined);

interface UserActivityProviderProps {
  children: ReactNode;
}

export const UserActivityProvider = ({children}: UserActivityProviderProps) => {

  const currentDate = new Date(); 
  const { user } = useAuth();

  const [userActivity, setUserActivity] = useState<UserActivity[] | null>(null);
  const [dateSelected, setDateSelected] = useState<Date>(currentDate)

  // TESTING
  // const[updateExOrSet, ]

  useEffect(() => {
    if (user) {
      getUserActivityForMonth(currentDate)
    }
  }, [user]);


  const getUserActivityForMonth = async(date:Date): Promise<UserActivity[]> =>{
    try{
      let dateYear = date.getFullYear();
      let dateMonth = date.getMonth() + 1 ; 
      let response =  await getUserActivityByDate(dateYear, dateMonth, null); 
      setUserActivity(response)
      return response;
    }catch(error:any){
      console.log("error in context")
      return error;
    }
  }

  const getDayActivity = (daySelected: Date) => {
    if (userActivity !== null) {
      let userActivityForDate =  userActivity.find((day) => {
        let dayCheck = new Date(day.date); 
        return dayCheck.toLocaleDateString() === daySelected.toLocaleDateString();
      });
      return userActivityForDate;
      
    } else {
      console.log("ERROR IS getDayActivity line67")

    }
  };
  
  return (
    <UserActivityContext.Provider value={{ userActivity, dateSelected, setDateSelected, getDayActivity, getUserActivityForMonth}}>
      {children}
    </UserActivityContext.Provider>
  );
};
