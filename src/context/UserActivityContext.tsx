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
  getDayActivity: (daySelected: Date) => UserActivity[];
  getUserActivityForMonth:(monthSelected:Date) => Promise<UserActivity[]>; 
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
          console.log("res:", res);
          setUserActivity(res);
          console.log("userActivity:", userActivity)
        })
        .catch((error: any) => {
          console.log("error line 46")
          console.log(error);
        });
    }
    // console.log(userActivity)
  }, [user]);

  console.log(userActivity);

  const getUserActivityForMonth = async(month:Date): Promise<UserActivity[]> =>{
    try{
      let monthYear = month.getFullYear(); 
      let monthSet = month.getMonth(); 

      let response =  await getUserActivityByDate(monthYear, monthSet, null); 
      // let response = await getUserActivityByDate(null, null, month);
      console.log("getUserActivityByDate Response:", response)
      return response;
      // console.log(response)
      console.log("monthButton response", response) 
    }catch(error:any){
      console.log("error in context")
      return error;
    }

    // .then((res) => {
    //   setUserActivity(res)
    //   return res;
    // })
    // .catch((error: any) => {
    //   console.log("error line 58")
    //   console.log(error);
    // });
  }

  const getDayActivity = (daySelected: Date) => {
    if (userActivity) {
      console.log(userActivity)
      return userActivity.filter((day) => {
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
      return [];
    }
  };
  
  return (
    <UserActivityContext.Provider value={{ userActivity, getDayActivity, getUserActivityForMonth}}>
      {children}
    </UserActivityContext.Provider>
  );
};
