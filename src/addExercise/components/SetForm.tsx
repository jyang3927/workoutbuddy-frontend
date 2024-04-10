import { Box, Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FormEvent, useState } from "react";
import { Set } from "../../models/Set";

interface SetFormProps {
    onSet: (set:Set) => void
  }

export function SetForm ({onSet}:SetFormProps) {
    const [open, setOpen] = useState(false);
    const [weight, setWeight] = useState<number>(0);
    const [reps, setReps] = useState<number>(0);
    const [setNumber, setSetNumber] = useState<number>(0);

    const handleOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        onSet({weight:weight, reps:reps, setNumber:setNumber, uId:''})
        // clear the form
        setWeight(0)
        setReps(0)
        setSetNumber(0)
      }
      
    return (
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
        </div>
    )
}

// Expand on form,
// Make responsive to each exercise