import { Box, Button, Modal, TextField } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Exercise } from "../models/Exercise"
import { Set } from "../models/Set"
import { createNewSetInExercise } from "../services/dataBase/dbSetService"
import '../styles/addSet.css'
import { useUserActivity } from "../hooks/useUserActivity"

interface AddSetProps{
    exercise:Exercise | null;
}

export function AddSet({exercise}: AddSetProps){

    const {dateSelected, getUserActivityForMonth, userActivity} = useUserActivity();

    const [currentSet, setCurrentSet] = useState<Set|null>(null)
    const [setNumber, setSetNumber] = useState<number>(0)
    const [weight, setWeight] = useState<number>(0)
    const [reps, setReps] = useState<number>(0)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        getUserActivityForMonth(dateSelected)
        console.log("USERACTIVITY SET USE EFFECT", userActivity )
    }, [currentSet])

    const createNewSet = async(set: Set, exerciseId:string) => {
        try{
            let newSet = await createNewSetInExercise(set, exerciseId);
            setCurrentSet(newSet); 
            return newSet;
        }catch (error:any){
            console.log("Error failed to fetch data", error); 
            throw error;
        }   
      }
    

    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault()
        if(exercise){
            const result = await createNewSet({setNumber:setNumber, weight: weight, reps:reps, uId:''}, exercise._id!)
        }
    
        setWeight(0)
        setReps(0)
        setSetNumber(0)
    }

    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    return(
        <div>
            <Button variant="contained" onClick={handleOpen} size="small" style={{display: 'flex', alignItems:'center', fontSize: '10px', padding:'0', margin:"10px"}}>Add Set</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <form className="setForm" onSubmit={handleSubmit}>
                <TextField label="Set Number" value={setNumber} style={{margin:"7px"}} onChange={(e) => setSetNumber(Number(e.target.value))}></TextField>
                <TextField label="Weight" value={weight} style={{margin:"7px"}} onChange={(e) => setWeight(Number(e.target.value))}></TextField>
                <TextField label="Reps" value={reps} style={{margin:"7px"}} onChange={(e) => setReps(Number(e.target.value))}></TextField>
                <Button type="submit" variant="contained" sx={{ mt: 2 }} style={{margin:"7px"}} >Submit</Button>
            </form>
            <Button onClick={handleClose}>Done</Button>
            </Box>
            </Modal>
        </div>
    )
}
