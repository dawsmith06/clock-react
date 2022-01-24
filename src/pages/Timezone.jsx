import React,{Fragment,useState,useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import moment from "moment-timezone";
import classNames from "classnames";

const timezones = moment.tz.names();

export function Timezone(){
    let navigate = useNavigate();
    let params = useParams();
    const _timezones = JSON.parse(localStorage.timezones || '[]');
    const id = params.id;
    const _tz = _timezones[id];
    const [selectedTimezone,setSelectedTimezone] = useState(_tz);
    const [name, setName] = useState('');
    const [filteredTimezones, setTimezones] = useState(timezones);
    
    if(selectedTimezone){
        setTimeout(() => document.getElementById(selectedTimezone).scrollIntoView(), 500);
    }

    const selectTimezone = (timezone) => {
        setSelectedTimezone(timezone);
    }

    const filter = (e) => {
        const search = e.target.value;
        if (search !== '') {
          const results = timezones.filter((tz) => tz.toLowerCase().includes(search.toLowerCase()));
          setTimezones(results);
        } else {
          setTimezones(timezones);
        }
        setName(search);
    };
    
    const saveOrUpdate = ()=>{
        if(id > -1){
            _timezones[id] = selectedTimezone;
        }
        else{
            _timezones.push(selectedTimezone);
        }

        localStorage.timezones = JSON.stringify(_timezones);
        navigate(`/`);
    };

    return (
        <Fragment>
            <div className="container-fluid h-100 bg-white">
                <div className="row">
                    <div className="col-2">
                        <h3 className="pt-4 pointer" onClick={()=>navigate(`/`)}>⬅️</h3>
                    </div>

                    <div className="col-8 text-center">
                        <h3 className="text-muted mb-2 pt-4">
                            Select Timezone
                        </h3>
                        <h6 className="text-primary mb-4 mt-0">
                            {selectedTimezone}
                        </h6>
                    </div>

                    <div className="col-2"></div>
                </div>

                <input type="search" className="form-control mb-2" value={name} onChange={filter} placeholder="Filter"/>

                <div className="timezones-list-container">
                    <ul className="list-group small">
                        {filteredTimezones.map((timezone, index)=>(
                            <li key={timezone} 
                                id={timezone}
                                className={classNames("list-group-item small", {
                                    active: selectedTimezone == timezone,
                                })} 
                                onClick={() => selectTimezone(timezone)}>
                                <small>{index + 1})</small> {timezone}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='col-12 text-center mt-4'>
                    <button className="btn btn-primary" onClick={saveOrUpdate}>
                        {id > -1 ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </Fragment>
    )
}