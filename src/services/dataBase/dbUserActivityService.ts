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
    const response = await dbAxiosInstance.get(`/api/userActivity`, {
      params: {
        year: year,
        month: month,
        date: date,
      },
    });
    // console.log("response.status:", response.status)
    console.log("responseData", response.data);
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
    // console.log(activityData)
    const response = await dbAxiosInstance.post(
      `/api/userActivity`,
      activityData
    );
    console.log("db", response.data.date);
    return response.data.date;
  } catch (error: any) {
    console.error("Failed to create user activity:", error);
    throw error;
  }
};

//Delete User Activity
export const deleteUserActivity = async (
  activityInfo: {
    uId: string;
    date: Date;
  } | null
): Promise<UserActivity> => {
  try {
    console.log(activityInfo);
    console.log(`Deleting user activity with ID: ${activityInfo}`);
    const response = await dbAxiosInstance.delete(
      `/api/userActivity/${activityInfo}`
    );
    console.log("Activity deleted:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Failed to delete user activity:", error);
    throw error;
  }
};
//return array of exercise ObjectId;
