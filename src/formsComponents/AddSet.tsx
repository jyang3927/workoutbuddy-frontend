import { Box, Button, Modal, TextField } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Exercise } from "../models/Exercise"
import { Set } from "../models/Set"
import { getExerciseById } from "../services/dataBase/dbExerciseService"
import { createNewSetInExercise } from "../services/dataBase/dbSetService"


export function AddSet(){
    const exerciseId = useParams().exerciseId
    const [currentExercise, setCurrentExercise] = useState<Exercise|null>(null)
    const [setNumber, setSetNumber] = useState<number>(0)
    const [weight, setWeight] = useState<number>(0)
    const [reps, setReps] = useState<number>(0)
    const [open, setOpen] = useState(false)

    function getTheExercise() {
        if (exerciseId) {
            getExerciseById(exerciseId)
            .then((response) => {setCurrentExercise(response)})
        }
    }
    useEffect(()=> {
        getTheExercise()}, [exerciseId])

    const createNewExerciseInRoutine = async(set: Set) => {
      if(exerciseId){
      let newSet = await createNewSetInExercise(set, exerciseId);
      await getTheExercise() 
      return newSet
      }
    }

    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault()
        const result = await createNewExerciseInRoutine({setNumber:setNumber, uId:''})
    
        setWeight(0)
        setReps(0)
        setSetNumber(0)
    }

    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    return(
        <div>
            <Button onClick={handleOpen}>Add Set</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <form onSubmit={handleSubmit}>
                <TextField label="Set Number" value={setNumber} onChange={(e) => setSetNumber(Number(e.target.value))}></TextField>
                <TextField label="Weight" value={weight} onChange={(e) => setWeight(Number(e.target.value))}></TextField>
                <TextField label="Reps" value={reps} onChange={(e) => setReps(Number(e.target.value))}></TextField>
                <button>Submit</button>
            </form>
            </Box>
            </Modal>
            <div>
            {currentExercise && currentExercise.sets.map((set) => {
                return (
                    <div>
                        <p>{set.setNumber}</p>
                    </div>
                )
            })}
            </div>
        </div>
    )
}