import { Button, Modal, Box, TextField } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react';
import { createExerciseInRoutine } from '../services/dataBase/dbExerciseService';
import { useActionData, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUserActivity } from '../hooks/useUserActivity';
import { createUserActivity } from '../services/dataBase/dbUserActivityService';
import { createNewRoutine } from '../services/dataBase/dbRoutineService';
import { UserActivity } from '../models/UserActivity';
import { Routine } from '../models/Routine';
import { AddExercise } from './AddExercise';

export function AddNewUserActivity() {
    const {user} = useAuth(); 
    const nav = useNavigate()
    const {userActivity, dateSelected} = useUserActivity(); 

    const [open, setOpen] = useState<boolean>(false);
    const [routineNameInput, setRoutineNameInput] = useState<string>("")

    const [newActivityTemp, setNewActivityTemp] = useState<UserActivity | null>(null)

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };


    //Creating new userActivity
    const createNewUserActivityandRoutine = async(userActivity: UserActivity): Promise<void> => {
        let response = await createUserActivity(userActivity); 
        console.log("createNewUserActFun", response); 
        let routineAdded = await createNewRoutineInDate({uId: response.uId, routineName:routineNameInput, exercises:[]}, response._id!); 
        console.log("ROUTINE ADDED", routineAdded)
        console.log(routineAdded._id)
        nav(`/routine/${encodeURIComponent(routineAdded._id!)}`)
    }

    //creating new routine in useractivity 
    const createNewRoutineInDate = async(routine:Routine, userId:string) => {
        let newRoutine = await createNewRoutine(routine, userId); 
        return newRoutine
    }

    function handleSubmit(e:FormEvent){
        e.preventDefault(); 
        if(user){
            let responseTest = createNewUserActivityandRoutine({uId: user?.uid, date:dateSelected, routines:[], workedOut: true})
            console.log("ResponseTEST", responseTest)   
        }

    }
    return(
        <div>
            <Button variant="contained" onClick={handleOpen}>Add Workout</Button>
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