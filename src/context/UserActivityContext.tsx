import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
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
  getDayActivity: (date: Date) => UserActivity[];
  userActivity: UserActivity[] | null;
  createActivity: (activityData: UserActivity) => Promise<void>;
  updateActivity: (activityData: UserActivity) => Promise<void>;
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
      updateUserActivity(activityData)
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
    } catch (error: any) {
      console.error("Error updating activity:", error);
    }
  };
  return (
    <UserActivityContext.Provider
      value={{ userActivity, getDayActivity, createActivity, updateActivity }}
    >
      {children}
    </UserActivityContext.Provider>
  );
};
