import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { ClassNames } from '@emotion/react';
import Navigator from './Navigator';
const Header = () => {
    const [nav, setNav]=useState('none');

    const Navihandler=()=>{
      if(nav==='none'){
        setNav('block')
      }
      else
        setNav('none')
    }
  return (
    <div>
        <button onClick={Navihandler}><MenuIcon/></button>
        <Navigator display={nav}/>
    </div>
  )
}

export default Header