import React,{useState,useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment-timezone";

export default function Clock(props) {
  const {timezone, index} = props;
  const [clock,setClock] = useState(moment().tz(timezone));
  let navigate = useNavigate();
  let params = useParams();

    useEffect(()=>{
        setInterval(() => {
            setClock(   
                moment().tz(timezone)
            );
        }, 1000);
    },[timezone]);

    const editClock = ()=>{
        navigate(`/timezones/${index}`);
    };

  return (
    <div className="col col-lg-4 pointer clock-item" timezone={clock.tz()}>
        <a href="#" className="delete-clock" data-id={index} data-name={clock.tz()}>
            ⛔️
        </a>
        <div className="clock-info"  onClick={editClock}>
            <span className="clock-tz">
                {getFormattedTimezone(clock.tz())}
            </span>
            <div className="clock-dates mb-2">
                <span className="clock-weekday">{clock.format("dddd")} </span>
                <span className="clock-date">{clock.format("MMMM")} {clock.format("D")}, {clock.format("YY")} </span>
            </div>
            <div className="clock-time">
                <span className="clock-hour">{clock.format("hh")}</span>
                <span className="clock-minutes">{clock.format(":mm")}</span>
                <span className="clock-seconds">{clock.format("ss")}</span>
                <span className="clock-ampm">{clock.format("A")}</span>
            </div>
        </div>
    </div>

  );
}

let getFormattedTimezone = (timezone) => {
    let names = timezone.split("/");
    return names.length > 1 ? names[1].replace("_"," ") : names[0];
};
