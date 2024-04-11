import { FormEvent, useEffect, useState } from "react";
import { UserActivity } from "../../models/UserActivity";
import { getRoutineById } from "../../services/dataBase/dbRoutineService";
import { Routine } from "../../models/Routine";
import { ExercisePerRoutine } from "./ExercisePerRoutine";
import '../../styles/routineForDate.css'
import { Box, Button, Modal, TextField } from "@mui/material";
import { Exercise } from "../../models/Exercise";
import { createExerciseInRoutine } from "../../services/dataBase/dbExerciseService";
import { ExerciseApiResponse } from "../../models/ExerciseApiResponse";
import { searchExerciseName } from "../../services/ExerciseApiService";

interface RoutineForDateProps{
    routine: Routine;
}

export function RoutineForDate({routine}: RoutineForDateProps){
    const [routineObj, setRoutineObj] = useState<Routine | null>(null)
    const [open, setOpen] = useState(false)
    const [exercises, setExercises] = useState<ExerciseApiResponse[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [muscle, setMuscle] = useState<string>('')
    const [sets, setSets] = useState<string[]>([])
    const [selectedName, setSelectedName] = useState('')
    const [currentRoutine, setCurrentRoutine] = useState<Routine|null>(null)

    const routineId = routine._id
    function getTheRoutine() { 
        if(routineId){
        getRoutineById(routineId)
        .then((response)=> {setCurrentRoutine(response)})
        }
      }
  
      useEffect(()=> {
        getTheRoutine()
        }, [routineId])
  
      const createNewExerciseInRoutine = async(exercise: Exercise) => {
        if(routineId){
        let newExercise = await createExerciseInRoutine(exercise, routineId);
        await getTheRoutine() 
        return newExercise
        }
    }
  
    
      const handleSubmit = async(e:FormEvent) => {
        e.preventDefault()
        console.log(selectedName + type + muscle + sets + muscle)
        // send to MongoDB
        const result = await createNewExerciseInRoutine({name:selectedName, type:type, muscle:muscle, sets:[], uId:muscle})
        console.log('tomato', result)
  
        // clear the form
        setSearchTerm('')
        setType('')
        setMuscle('')
      }
    
      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleChange = (event:any) => {
        setSelectedName(event.target.value);
        const foundMuscle = exercises.find((item)=> item.name === event.target.value)
        console.log(foundMuscle)
        if (foundMuscle) {
        setMuscle(foundMuscle.muscle)
        setType(foundMuscle.type)
        }
      }
    
      const getExercisesName = async() => {
        try{
            let response = await searchExerciseName(searchTerm) 
            setExercises(response)
        }
        catch(error:any){
            console.log("Failed")
        }
    }
        let delay:any;
        useEffect(()=> 
        { delay = setTimeout(()=> {
        getExercisesName();}, 750)},[searchTerm])


    return(
        <div className="RoutineDiv"> 
            <div className="RoutineLabel">ROUTINE <span className="RoutineName">: {routine.routineName}</span>
            <div>
        <Button variant="contained" onClick={handleOpen}>Add Exercise</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', 
          transform: 'translate(-50%, -50%)', width: 600, height: 800,
          bgcolor: 'wheat', boxShadow: 24, p: 4, borderRadius:'10px'}}>
            <form className="AddExerciseForm" onSubmit={handleSubmit}>
              <div className='ExerciseInputDiv'>
              <TextField sx={{bgcolor:'white'}} label="Name" fullWidth value={searchTerm}
              onChange={(e) => {clearTimeout(delay); setSearchTerm(e.target.value)}}/>
              {exercises &&
              <select name="options" id="options" value={selectedName} onChange={handleChange}>
              {exercises.map((item)=> <option value={item.name}>{item.name}</option> )}
          </select>}
              <TextField sx={{bgcolor:'white'}} className='ExerciseInputDiv' label="Type" fullWidth value={type} onChange={(e) => setType(e.target.value)}/>
              <TextField sx={{bgcolor:'white'}} label="Muscle" multiline fullWidth value={muscle} onChange={(e) => setMuscle(e.target.value)}/>
              </div>
              {/* Add more form fields as needed */}
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
            </form>
          </Box>
        </Modal>
      </div>
            </div>
            <div>
            {routine.exercises.length !== 0 && routine.exercises.map((exercises) => <ExercisePerRoutine exercise={exercises}/>)}
            </div>
        </div>
    )
}

//     // useEffect(() => {
//     //     if(routineObj){
//     //         setExercises(routineObj?.exercises)
//     //     }
        
//     // }, [routineObj])

//     const getRoutineInfo = async(routineIds:string) => {
//         let routineArray = await getRoutineById(routineIds); 
//         console.log("ROUTINE INFO", routineArray)
//         // setRoutineObj(routineArray); 
//         return routineArray;
//     }
    
// //    let response = getRoutineInfo(routineId); 
    // console.log("Routine", routine.exercises
    // )
    // console.log("RoutineExercisesLength", routine.exercises.length)
    // console.log("Routines Exercises Array", routine.exercises[0])