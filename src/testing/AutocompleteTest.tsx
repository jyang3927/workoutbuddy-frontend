import React, { useState, useEffect } from 'react';
import { ExerciseApiResponse } from '../models/ExerciseApiResponse';
import { searchExerciseName } from '../services/ExerciseApiService';

function AutocompleteTest() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [exercises, setExercises] = useState<ExerciseApiResponse[]>([])

  const getExercisesName = async() => {
    try{
        let response = await searchExerciseName(searchTerm); 
        setExercises(response)
    }catch(error:any){
        console.log("Failed")
    }
}
let delay:any;

  useEffect(()=>{
   delay = setTimeout(()=>{
    getExercisesName();
  }, 750)
  console.log(delay)
  },[searchTerm])
  
  return (
    <div>
      <form action="">
        <input type="text" name="search" id="search" value={searchTerm}
        onChange={(e) => {clearTimeout(delay); setSearchTerm(e.target.value)}}
        />
        {exercises &&
          <select name="options" id="options">
          {exercises.map((item)=> <option value={item.name}>{item.name}</option> )}
        </select>}
      </form>
    </div>
  )
}

export default AutocompleteTest