import React from "react";
import { Link } from "react-router-dom";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Setting from "./Setting";
import "./Navigator.css"
const Navigator=({display})=>{

    return(
        <div className="navigator" style={{display:display}}>
            <ul>
                <li><Link to="/">Home</Link> </li>
                <li><Link to="./Setting">{<SettingsApplicationsIcon/>}</Link></li>
                <li><Link to="./About">About</Link></li>
            </ul>
             
        </div>
    )
}

export default Navigator