import { set } from "date-fns";
import { Set } from "../../models/Set";

interface SetInfoProps{
    sets:Set;
}

export function SetInfo({sets}:SetInfoProps){
    return(
        <div>
            <p>Set Number: {sets.setNumber}</p>
            { }
        </div>
    )
}