import { Button, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export function SetForm () {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      
    return (
        <div>
            <Button onClick={handleOpen}>Add Set</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <form action="">
                <TextField label="weight"></TextField>
                <TextField label="reps"></TextField>
                <button>Submit</button>
            </form>
            </Modal>
        </div>
    )
}

// Expand on form,
// Make responsive to each exercise