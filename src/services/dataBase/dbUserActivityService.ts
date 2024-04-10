import axios from "axios";
import { UserActivity } from "../../models/UserActivity";
import dbAxiosInstance from "../helpers/dbAxiosInstance";

export const getUserActivityByDate = async (
  year: number | null,
  month: number | null,
  date: Date | null
): Promise<UserActivity[]> => {
  try {
    console.log("dbUserActivityService year:", year); 
    console.log("dbUserActivityService month:", month);
    const response = await dbAxiosInstance.get(`/userActivity`, {
      params: {
        year: year, month: month, date: date
      }
    });
    // console.log("response.status:", response.status)
    console.log ("responseData",response.data)
    return response.data;
  } catch (error: any) {
    // console.log("error api")
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};
//Create user activity
export const createUserActivity = async (
  activityData: UserActivity
): Promise<UserActivity> => {
  try {
    const response = await dbAxiosInstance.post<UserActivity>(
      `/api/userActivity`,
      activityData
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to create user activity:", error);
    throw error;
  }
};

//update User Activity
export const updateUserActivity = async (
  uId: string,
  activityData: UserActivity
): Promise<UserActivity> => {
  try {
    const response = await dbAxiosInstance.put<UserActivity>(
      `/api/userActivity/${uId}`,
      activityData
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to add or update user activity:", error);
    throw error;
  }
};
//get array of activities UserActvitiy:

export const createUserActivity = async (
  activityData: UserActivity
): Promise<UserActivity> => {
  try {
    // console.log(activityData)
    const response = await dbAxiosInstance.post(
      `/userActivity`,
      activityData
    );
    console.log("db", response.data.date)
    return response.data.date;
  } catch (error: any) {
    console.error("Failed to create user activity:", error);
    throw error;
  }
};


//return array of exercise ObjectId;



//Create user activity 

