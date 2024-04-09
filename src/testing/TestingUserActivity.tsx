import { useState } from "react";
import { UserActivity } from "../models/UserActivity";
import {
  createUserActivity,
  getUserActivityByDate,
  updateUserActivity,
} from "../services/dataBase/dbUserActivityService";
import { useUserActivity } from "../hooks/useUserActivity";

//test create user
export function TestingUserActivity() {
  const [user, setUser] = useState<UserActivity>({
    uId: "demo",
    date: new Date("04-08-2024"),
    routines: ["demo", "demo"],
    workedOut: true,
  });
  let dateTest = new Date();
  const [userActivityTest, setUserActivityTest] = useState<
    UserActivity[] | null
  >([]);
  const [newActivityTest, setNewActivityTest] = useState<UserActivity>(user);
  console.log(dateTest);
  const { updateActivity } = useUserActivity();
  const getUserActivityTesting = async (month: Date) => {
    let yearDate = month.getFullYear();
    console.log("year", yearDate);
    let monthDate = month.getMonth();
    console.log("month", monthDate);
    let response = await getUserActivityByDate(null, null, null);
    console.log("service response", response);
    setUserActivityTest(response);
    console.log(userActivityTest);
  };
  const createUserActivityTesting = async (newActivity: UserActivity) => {
    let response = await createUserActivity(newActivity);
    console.log("Response from testing", response);
    setNewActivityTest(response);
  };
  const [updateActivityTest, setUpdateActivityTest] =
    useState<UserActivity>(user);
  console.log(dateTest);
  const updateUserActivityTesting = async (userActivity: UserActivity) => {
    const response = await updateActivity(userActivity);
    console.log(response);
  };
  return (
    <div>
      <h1>Get User Activity</h1>
      <button onClick={() => getUserActivityTesting(dateTest)}>
        testing user activity
      </button>
      <h1>Create User Activity</h1>
      <button
        onClick={() =>
          createUserActivityTesting({
            uId: "createUser",
            date: dateTest,
            routines: [],
            workedOut: true,
          })
        }
      >
        Create user activity
      </button>
      <button
        onClick={() =>
          updateUserActivityTesting({
            uId: "createUser",
            date: dateTest,
            routines: ["demo", "testestest"],
            workedOut: false,
          })
        }
      >
        updating user activity
      </button>
      {newActivityTest._id}
    </div>
  );
}
//test update user
