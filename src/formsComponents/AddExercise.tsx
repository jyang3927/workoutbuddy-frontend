import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';
import { searchExerciseName } from '../services/ExerciseApiService';
import { ExerciseApiResponse } from '../models/ExerciseApiResponse';
import {Exercise} from '../models/Exercise';
import { Set } from '../models/Set';
import { createExerciseInRoutine, createNewExercise } from '../services/dataBase/dbExerciseService';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Routine } from '../models/Routine';

interface AddExerciseProps{
  routine:Routine | null; 
}

export function AddExercise({routine}: AddExerciseProps) {


    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [exercises, setExercises] = useState<ExerciseApiResponse[]>([])
    const [type, setType] = useState<string>('')
    const [muscle, setMuscle] = useState<string>('')
    const [sets, setSet] = useState<string[]>([])
    const [selectedName, setSelectedName] = useState('')

    const [createdExercise, setCreatedExercise] = useState<Exercise | null>(null);
  
    const createExerciseForRoutine = async(exercise: Exercise, routineId:string) => {
      try{
          let response = await createExerciseInRoutine(exercise, routineId); 
          setCreatedExercise(response); 
          console.log(response)
      }catch (error:any){
          console.log("Error failed to fetch data", error); 
          throw error;
      }   
  }
  
    function handleSubmit(e:FormEvent) {
      e.preventDefault()
      console.log(selectedName + type + muscle + sets + muscle)
      // send to MongoDB
      if(routine !== null){
        createExerciseForRoutine({name:selectedName, type:type, muscle:muscle, sets:[], uId:routine.uId}, routine?._id!)
      }
      // clear the form
      setSearchTerm('')
      setType('')
      setMuscle('')
    }
  
    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};
  
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
  
    return (
      <div>
        <IconButton size="small" onClick={handleOpen}><AddIcon/></IconButton>
        {/* <Button startIcon={<AddIcon />} variant="contained" size="small" sx={{bgcolor:'primary.dark'}} style={{fontSize:"10px"}} onClick={handleOpen}></Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
            <form onSubmit={handleSubmit}>
              <TextField label="Name" fullWidth value={searchTerm}
              onChange={(e) => {clearTimeout(delay); setSearchTerm(e.target.value)}}/>
              {exercises &&
              <select name="options" id="options" value={selectedName} onChange={handleChange}>
              {exercises.map((item)=> <option value={item.name}>{item.name}</option> )}
          </select>}
              <TextField label="Type" fullWidth value={type} onChange={(e) => setType(e.target.value)}/>
              <TextField label="Muscle" fullWidth value={muscle} onChange={(e) => setMuscle(e.target.value)}/>

              <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
            </form>
          </Box>
        </Modal>
      </div>
    )
}