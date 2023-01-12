import { useState, useEffect, ChangeEvent } from "react";
import { json } from "stream/consumers";
import Spinner from 'react-bootstrap/Spinner';
import {User} from './types/User';
import style from './style.module.css';
import React from "react";
import {useRoutes, Link } from "react-router-dom";
import {MyRoutes} from './routes/MyRoutes';



const App = () => {



  return (

    <div>
      
        <MyRoutes />
 
    </div>
  );
}

export default App;