import React,{Fragment,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";
import { RandomBackground } from "../components/RandomBackground";
import Clock from "../components/Clock";
import { useLongPress,LongPressDetectEvents } from 'use-long-press';
import classNames from "classnames";

export function Home(){
    let navigate = useNavigate();
    const [deletionMode,setDeletionMode] = useState(false);
    const [timezones,setTimezone] = useState([]);

    useEffect(()=>{
        const timezones = JSON.parse(localStorage.timezones || '[]');
        setTimezone(timezones);
    },[]);

    
    const longPress = useLongPress((e) => {
        setDeletionMode(true);
    },{
        onFinish: () => window.deletionMode = true,
        onCancel: (e) =>{
            const elem = e.target;
            if(elem.className=="delete-clock"){
                let id = elem.attributes['data-id'].nodeValue;
                let tz = elem.attributes['data-name'].nodeValue;
                let c = window.confirm(`Are you sure you want to delete ${tz} clock?`);
                if(c){
                    timezones.splice(id, 1);
                    localStorage.timezones = JSON.stringify(timezones);
                }

            }else{
                setDeletionMode(false);
            }
        },
        cancelOnMovement:true,
        captureEvent:true,
        detect: LongPressDetectEvents.BOTH
    });

    return (
        <Fragment>
            <div {...longPress} className={classNames("container-fluid h-100 pointer",{"deletion-mode": deletionMode})}>
                <RandomBackground />
                <div id="clocks-container" className="row m-0 text-center align-items-center h-100">
                    {timezones.map((timezone,index)=>(
                        <Clock key={timezone} timezone={timezone} index={index}/>
                    ))}
                    <div className="col col-lg-4 pointer text-white add-clock" onClick={() =>  navigate("/timezones/-1")}>
                        ➕
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
