import { useState } from "react";
import { UserActivity } from "../models/UserActivity";

const [user, setUser] = useState<UserActivity>({
  uId: "demo",
  date: new Date("04-08-2024"),
  routines: ["demo", "demo"],
  workedOut: true,
});

const createActivity = async (activity: UserActivity) => {
  try {
    let response = await simulateCreateActivityAPI(activity);
    setUser(response);
    console.log("Activity created successfully:", response);
  } catch (error: any) {
    console.error("Error creating activity:", error);
    throw error;
  }
};

const simulateCreateActivityAPI = async (
  activity: UserActivity
): Promise<UserActivity> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        console.log("Simulated API: Create activity success.");
        resolve(activity);
      } else {
        console.log("Simulated API: Create activity failed.");
        reject("Failed to create activity");
      }
    }, 1000);
  });
};

const updateActivity = async (activity: UserActivity) => {
  try {
    let response = await simulateUpdateActivityAPI(activity);
    setUser((prev) => ({ ...prev, ...response }));
    console.log("Activity updated successfully:", response);
  } catch (error: any) {
    console.error("Error updating activity:", error);
    throw error;
  }
};
const simulateUpdateActivityAPI = async (
  activity: UserActivity
): Promise<UserActivity> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        console.log("Simulated API: Update activity success.");
        resolve(activity);
      } else {
        console.log("Simulated API: Update activity failed.");
        reject("Failed to update activity");
      }
    }, 1000);
  });
};
