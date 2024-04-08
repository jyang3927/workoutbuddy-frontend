import { useState } from "react"
import { Set } from "../models/Set"

interface SingleSetProps {
    set:Set
}

export function SingleSet ({set}: SingleSetProps) {
    /*function removeSet (uId:string) {
        setSets(sets.filter(sets => sets.uId !== uId))
    }*/
    return (
        <div style={{display: 'flex', backgroundColor: 'red', border:'10px solid black'}}>
            <p>Set Number {set.setNumber}: Weight: {set.weight}, Reps: {set.reps} </p>
            <button>Edit Set</button>
            <button>Delete Set</button>
        </div>
    )
}