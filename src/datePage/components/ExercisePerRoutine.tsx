import { useEffect, useState } from "react";
import { Exercise } from "../../models/Exercise";
import { getExerciseById } from "../../services/dataBase/dbExerciseService";
import '../../styles/exercisePerRoutine.css'
import { SetInfo } from "./SetInfo";
import { Button } from "@mui/material";

interface ExercisePerRoutineProps{
    exercise:string ;
}

export function ExercisePerRoutine({exercise}:ExercisePerRoutineProps){

    const [exerciseInfo, setExerciseInfo] = useState<Exercise | null>(null); 
    const [exerciseIdSet, setExerciseId] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false);

    // const [displayExerciseInfo, setDisplayExerciseInfo] = useState<

    useEffect(()=> {
        getExerciseInfo(exercise)
    }, [])


    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };


    const getExerciseInfo = async(exerciseId:string) => {
        // console.log('EXERCISE ID 24', exerciseId)
        let response = await getExerciseById(exerciseId); 
        setExerciseInfo(response);
    }

    const displayExerciseInfo = (exerciseInfo:Exercise) => {
        <p className="labels"> <span className="details">{exerciseInfo.sets.map((setInfo) => <SetInfo sets={setInfo}/>)}</span></p>
    }

    // console.log("exercise", exercise)
    // console.log("EXERCISEID", exerciseInfo)
    // console.log("EXERCISE INFO", exerciseInfo)
    return(
        <div className="ExercisePerRoutine">
            {exerciseInfo !== null && 
            <div className="BasicExerciseInfo">
                <div className="ExerciseHeader">
                    <div className="ExerciseName">
                        <p className="labels">Exercise: <span className="details">{exerciseInfo.name}</span></p>
                    </div>
                    <div className="SeeExerciseBtn">
                        <Button size="small" onClick={open === false ? handleOpen : handleClose} style={{display: 'flex', alignItems:'center', fontSize: '10px', padding:'0'}}>See Exercise Info</Button>
                        {/* <Button size="small" onClick={open === false ? handleClose : handleOpen} style={{display: open ===true ? "flex": "none"}}>Close Exercise Info</Button> */}
                    </div>
                </div>
                {open === true && <p className="labels"> <span className="details">{exerciseInfo.sets.map((setInfo) => <SetInfo sets={setInfo}/>)}</span></p>}
            </div>}
        </div>
    )
}
