import { Button, Modal, Box, TextField } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { createExerciseInRoutine } from '../services/dataBase/dbExerciseService';
import { useActionData } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUserActivity } from '../hooks/useUserActivity';
import { createUserActivity } from '../services/dataBase/dbUserActivityService';
import { createNewRoutine } from '../services/dataBase/dbRoutineService';
import { UserActivity } from '../models/UserActivity';
import { Routine } from '../models/Routine';
import { AddExercise } from './AddExercise';
import '../styles/addNewUserActivity.css'

interface AddNewUserActivityProps{
    currentUserActivity:UserActivity | null;
}

export function AddNewUserActivity({currentUserActivity}:AddNewUserActivityProps) {
    const {user} = useAuth(); 
    
    const {userActivity, dateSelected, getUserActivityForMonth} = useUserActivity(); 

    const [open, setOpen] = useState<boolean>(false);
    const [routineNameInput, setRoutineNameInput] = useState<string>("")
    const [newActivity, setNewActivity] = useState<Routine | null>(null)

    const [newActivityTemp, setNewActivityTemp] = useState<UserActivity | null>(null)

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        getUserActivityForMonth(dateSelected)
    }, [newActivity])


    //Creating new userActivity
    const createNewUserActivityandRoutine = async(userActivity: UserActivity): Promise<UserActivity> => {
        let response = await createUserActivity(userActivity); 
        console.log("createNewUserActFun", response); 
        let routineAdded = await createNewRoutineInDate({uId: response.uId, routineName:routineNameInput, exercises:[]}, response._id!); 
        console.log("ROUTINE ADDED", routineAdded)
        return response; 
    }

    //creating new routine in useractivity 
    const createNewRoutineInDate = async(routine:Routine, userId:string) => {
        let newRoutine = await createNewRoutine(routine, userId); 
        console.log("NEW ROUTINE RAN", newRoutine)
        setNewActivity(newRoutine)
        return newRoutine
    }

    function handleSubmit(e:FormEvent){
        e.preventDefault(); 
        if(user){
            console.log("DATE SELECTED FORM EVENT SUBMIT", dateSelected)
            if(currentUserActivity === null){
                let responseTest = createNewUserActivityandRoutine({uId: user?.uid, date:dateSelected, routines:[], workedOut: true})
                console.log("RESPONSE TEST IF USER ACT WAS NULL", responseTest)
            }else if (currentUserActivity !== null){
                let response = createNewRoutineInDate({uId: currentUserActivity.uId, routineName:routineNameInput, exercises:[]}, currentUserActivity._id!)
                console.log("RESPONSE TEST IF USER ACT WASNOT NULL", response)
            }
              
        }
    }
    return(
        <div>
            <div className="CreateNewLogBtn">
                <Button variant="contained" size="small" onClick={handleOpen}>Create New Log</Button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <form onSubmit={handleSubmit}>
                        <label>Create a name for your routine</label>
                        <TextField label="Routine Name" value={routineNameInput} onChange={(e) => setRoutineNameInput(e.target.value)}/>
                        {/* <AddExercise/> */}
                        <Button type="submit" variant="contained" sx={{ mt: 2 }} >Submit</Button>
                    </form>
                    <Button onClick={handleClose}>Done</Button>
                </Box>
            </Modal>
        </div>
    )
}