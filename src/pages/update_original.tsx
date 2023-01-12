import { useState, useEffect,ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';
// import { from } from 'rxjs';
// import { map } from 'rxjs/operators';
import style from '../style.module.css';
import { Button } from 'react-bootstrap';
import {User} from '../types/User';
import userEvent from '@testing-library/user-event';




export const Update =() =>{

  const [inputNameValue, setInputNameValue] = useState('');
  const [inputAgeValue,setInputAgeValue] = useState('');
  const { id,age,name} = useParams();

  useEffect(()=>{
    
  },[])


  const UpdateItem = async () => {
   
          const response  = await fetch(`http://localhost:5000/update/${id}`, {
              
          method: 'put',
        
          body: JSON.stringify({            
            age:inputAgeValue,
            name:inputNameValue
          }),
            headers: {
            'Content-Type': 'application/json'
          },
        });
        const json = await response.json(); //Obtendo a resposta
        console.log(json);
        alert('Alterado com sucesso');
        window.location.href=('/home');
   

       /* alert(inputNameValue+inputAgeValue);*/
    
  }

  //funcao para os inputs
  const handleInputName = (e:ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(e.target.value);
  }

  const handleInputAge = (e:ChangeEvent<HTMLInputElement>) =>{
    setInputAgeValue(e.target.value);
  }


    return (
        <div >

          
          <div className={style.formUpdate}>

            <form>
                <label>Nome</label>
                <input type="text"  placeholder='Nome' onChange={handleInputName} value={`${inputNameValue}`}/>

                <label>Idade</label>
                <input type="number"  placeholder='Idade' onChange={handleInputAge}  value={`${inputAgeValue}`} />


                
                <button onClick={()=>UpdateItem()} className='btn btn-success'>Alterar</button>

            </form>
          </div>
        </div>
    );  
}