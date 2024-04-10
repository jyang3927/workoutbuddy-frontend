import {
  ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";
import { UserActivity } from "../models/UserActivity";
import {
  createUserActivity,
  getUserActivityByDate,
  updateUserActivity,
} from "../services/dataBase/dbUserActivityService";
import { AuthContext } from "./AuthContext";
import { useAuth } from "../hooks/useAuth";

interface UserActivityContextType {
  getDayActivity: (daySelected: Date) => UserActivity|undefined;
  getUserActivityForMonth:(monthSelected:Date) => Promise<UserActivity[]>; 

  userActivity: UserActivity[] | null;
  createActivity: (activityData: UserActivity) => Promise<void>;
  updateActivity: (activityData: UserActivity) => Promise<void>;

  userActivity: UserActivity[] | null;  dateSelected: Date; 
  setDateSelected:(date:Date) => void; 

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

  const createActivity = async (activityData: UserActivity): Promise<void> => {
    try {
      createUserActivity(activityData)
        .then((createdActivity: UserActivity) => {
          if (userActivity !== null) {
            const newUserActivityList: UserActivity[] = userActivity.slice();
            newUserActivityList.push(createdActivity);
            setUserActivity(newUserActivityList);
          } else {
            setUserActivity([createdActivity]);
          }
        })
        .catch((error: any) => {
          console.error("Error creating activity:", error);
        });
    } catch (error: any) {
      console.error("Error creating activity:", error);
    }
  };

  const updateActivity = async (activityData: UserActivity): Promise<void> => {
    try {
      if (user) {
        updateUserActivity(user?.uid, activityData)
          .then((updatedActivity: UserActivity) => {
            if (userActivity !== null) {
              const updatedUserActivityList: UserActivity[] = [];
              for (let i = 0; i < userActivity.length; i++) {
                if (userActivity[i].uId === updatedActivity.uId) {
                  updatedUserActivityList.push(updatedActivity);
                } else {
                  updatedUserActivityList.push(userActivity[i]);
                }
              }
              setUserActivity(updatedUserActivityList);
            } else {
              setUserActivity([updatedActivity]);
            }
          })
          .catch((error: any) => {
            console.error("Error updating activity:", error);
          });
      }
    } catch (error: any) {
      console.error("Error updating activity:", error);
    }
  };
  return (
    <UserActivityContext.Provider
      value={{ userActivity, getDayActivity, createActivity, updateActivity,getUserActivityForMonth }}
    >
      {children}
    </UserActivityContext.Provider>
  );
};
