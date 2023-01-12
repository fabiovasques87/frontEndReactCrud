import { useState, useEffect, ChangeEvent } from "react";
import { json } from "stream/consumers";
import Spinner from 'react-bootstrap/Spinner';
import {User} from './types/User';
import style from './style.module.css';
import React from "react";

const App = () => {

  const [users,setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [addNameText, setAddNameText] = useState('');
  const[addAgeText, setAddAgeText] = useState ('');
  const[addIdText, setAddIdText] = useState ('');

  // useEffect(()=>{
  //   const timer = setTimeout(()=>{
  //     setLoading(true);
  //   },1000);
  //   return () => setLoading(false);
  // },[]);

  useEffect (()=>{
    //handleAddClick();
    carregar();
  }, []);



  
  const carregar = async () => {
       // setLoading(true);
        // let response = await fetch('http://localhost:5000/ping');
        let response = await fetch('http://localhost:5000/dados'); /*//recebe a url dado backend*/
        let json = await response.json();
        //setLoading(false);
        setUsers(json);

        // fetch('http://localhost:5000/ping')
        // .then((Response)=>{
        //   return Response.json();
        // })
        // .then((json)=>{
        //   setApi(json);
        // });
  }

  //funcao para os inputs
  const handleAddNameChange = (e:ChangeEvent<HTMLInputElement>) => {
    setAddNameText(e.target.value);
  }

  const handleAddAgeChange = (e:ChangeEvent<HTMLInputElement>) => {
    setAddAgeText(e.target.value);
  }

  const handleAddIdChange = (e:ChangeEvent<HTMLInputElement>) => {
    setAddIdText(e.target.value);
  }

  /* Funcao do click do button */
  const handleAddClick =  async () => {


  //   fetch('http://localhost:5000/add', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       id: 17,
  //       name: 'bar',
  //       age: 90,
  //     }),
  //     headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //     },
  //   })
  // .then((response) => response.json())
  // .then((json) => console.log(json));
    
       const response  = await fetch("http://localhost:5000/add", {
        
        method: 'post',
      
        body: JSON.stringify({
          id: addIdText,
          name:addNameText,
          age:addAgeText
        }),
          headers: {
          'Content-Type': 'application/json'
        },
       });
      const json = await response.json(); //Obtendo a resposta
      console.log(json);
    
   }

  return (

      <div>

       {loading && 
          
            <div>
               <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          }   


          <div>
            <>
              <div>

              <div className={style.form}>
                
                <form>
                  <>
                  <input type='number'                    
                    value={addIdText} 
                    placeholder={'insira o id'}
                    onChange={handleAddIdChange} />
                    <input type='text'
                    value={addNameText} 
                    placeholder={'insira o nome'}
                    onChange={handleAddNameChange} />
                  <input type='text'
                    value={addAgeText} 
                    placeholder={'insira a idade'}
                    onChange={handleAddAgeChange} 
                    />

                <button onClick={handleAddClick}>Cadastrar</button>

               
                </>
                </form>
              </div> 

               

              </div>
            </>
          </div>

      {/* <button onClick={carregar}>Caregar</button> */}
    </div>
  );
}

export default App;