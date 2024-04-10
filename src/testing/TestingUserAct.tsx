import { useState } from "react";
import { UserActivity } from "../models/UserActivity";
import {
  createUserActivity,
  getUserActivityByDate,
  deleteUserActivity,
} from "../services/dataBase/dbUserActivityService";

export function TestingUserActivity() {
  let dateTest = new Date();

  const [userActivityTest, setUserActivityTest] = useState<
    UserActivity[] | null
  >([]);
  const [newActivityTest, setNewActivityTest] = useState<UserActivity>({
    uId: "demo",
    date: dateTest,
    routines: [],
    workedOut: false,
  });
  const [activityIdForDeletion, setActivityIdForDeletion] = useState<
    string | null
  >(null);
  console.log(dateTest);
  const getUserActivityTesting = async (month: Date) => {
    let yearDate = month.getFullYear();
    console.log("year", yearDate);
    let monthDate = month.getMonth() + 1;
    console.log("month", monthDate);

    let response = await getUserActivityByDate(yearDate, monthDate, null);
    console.log("service response", response);
    setUserActivityTest(response);
    console.log(userActivityTest);
  };

  const createUserActivityTesting = async (newActivity: UserActivity) => {
    let response = await createUserActivity(newActivity);
    console.log("Response from testing", response);
    setNewActivityTest(response);
  };
  const deleteUserActivityTesting = async () => {
    if (activityIdForDeletion) {
      try {
        await deleteUserActivity(activityIdForDeletion);
        console.log(`Activity with ID ${activityIdForDeletion} deleted`);
        setActivityIdForDeletion(null);
      } catch (error) {
        console.error("Deletion failed:", error);
      }
    } else {
      console.log("No activity ID specified for deletion.");
    }
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
        testing user activity
      </button>
      <h1>Delete User Activity</h1>
      <button onClick={() => deleteUserActivityTesting()}>
        Test Delete Activity
      </button>
      {newActivityTest && newActivityTest._id && (
        <p>New activity ID: {newActivityTest._id}</p>
      )}
      {newActivityTest._id}
    </div>
  );
}
