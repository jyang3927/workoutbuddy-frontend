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
  getDayActivity: (daySelected: Date) => UserActivity[];
  getUserActivityForMonth:(monthSelected:Date) => Promise<UserActivity[]>; 
  userActivity: UserActivity[] | null;
  createActivity: (activityData: UserActivity) => Promise<void>;
  updateActivity: (activityData: UserActivity) => Promise<void>;
}

export const UserActivityContext = createContext<UserActivityContextType | undefined>(undefined);

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
      let currentDate = new Date(); 
      getUserActivityByDate(
        currentDate.getFullYear(),
        (currentDate.getMonth() + 1),
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


  const getUserActivityForMonth = async(month:Date): Promise<UserActivity[]> =>{
    try{
      let monthYear = month.getFullYear();
      console.log("MonthYear", monthYear) 
      let monthSet = month.getMonth() + 1 ; 
      console.log("Monthset", monthSet)
      let response =  await getUserActivityByDate(monthYear, monthSet, null); 
      // let response = await getUserActivityByDate(null, null, month);
      console.log("getUserActivityByMonth Response:", response)
      setUserActivity(response)
      return response;
      // console.log(response)
    }catch(error:any){
      console.log("error in context")
      return error;
    }
  }

  const getDayActivity = (daySelected: Date) => {
    if (userActivity) {
      console.log(userActivity)
      return userActivity.filter((day) => {
        return day.date === daySelected;
      });
      // try{
      //   let response = getUserActivityByDate(null, null, day)
      //   return response 
      // }catch(error:any){
      //   console.log("error here")
      // }
    } else {
      console.log("ERROR IS getDayActivity line67")
      return [];
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
