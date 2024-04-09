import { UserActivity } from "../../models/UserActivity";
import dbAxiosInstance from "../helpers/dbAxiosInstance";

export const getUserActivityByDate = async (
  year: number | null,
  month: number | null,
  date: Date | null
): Promise<UserActivity[]> => {
  try {
    const response = await dbAxiosInstance.get(`/userActivity`, {
      params: { year, month, date },
    });
    return response.data;
  } catch (error: any) {
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
      `/userActivity`,
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
  activityData: UserActivity
): Promise<UserActivity> => {
  try {
    const response = await dbAxiosInstance.post<UserActivity>(
      `/userActivity/:id`,
      activityData
    );
    return response.data;
  } catch (error: any) {
    console.error("Failed to add or update user activity:", error);
    throw error;
  }
};
//get array of activities UserActvitiy:

//return array of exercise ObjectId;
