import React, { useState } from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';
import { searchExerciseName } from '../../services/ExerciseApiService';
import { ExerciseApiResponse } from '../../models/ExerciseApiResponse';

const AddExerciseForm = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(""); 
  const [nameExercise, setNameExercise] = useState<ExerciseApiResponse[]>([]); 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getExercisesName = async(name:string) => {
    try{
        let response = await searchExerciseName(name); 
        setNameExercise(response)
    }catch(error:any){
        console.log("Failed")
    }
}

  return (
    <div>
      <Button onClick={handleOpen}>Add Exercise</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <form>
            <TextField label="Name" fullWidth onChange={(e) => setName(e.target.value)}/>
            <button onClick={() => getExercisesName(name)}>click</button>
            {nameExercise.map(item => <div>{item.name}</div>)}
            <TextField label="Type" fullWidth />
            <TextField label="Muscle" fullWidth />
            {/* Add more form fields as needed */}
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AddExerciseForm;