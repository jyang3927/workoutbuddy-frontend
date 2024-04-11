import { Set } from "../../models/Set";
import '../../styles/setInfo.css'
interface SetInfoProps{
    sets:Set;
}

export function SetInfo({sets}:SetInfoProps){
    return(
        <div className="SetInfo">
            <div>
                <h4>Set {sets.setNumber}</h4>
            </div>
            <div>
                <div>
                    <p className="labelSet">Weights: <span className="setDetail">{sets.weight}lbs</span></p>               
                </div>
                <div>
                    <p className="labelSet">Reps: <span className="setDetail">{sets.reps}</span></p> 
                </div>
            </div>
                
        </div>
    )
}