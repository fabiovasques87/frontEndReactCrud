import { useState, useEffect, ChangeEvent } from "react";
import { json } from "stream/consumers";
import Spinner from 'react-bootstrap/Spinner';
import {User} from '../types/User';
import style from '../style.module.css';
import React from "react";
import {useRoutes, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';






export const Home = () => {
 
  const [users,setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletar, setDeletar] = useState([]);

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
    //excluir();
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

  const deleteItem = async (id:number) => {
    const response  = await fetch(`http://localhost:5000/del/${id}`, {
        
    method: 'delete',
  
    body: JSON.stringify({
      //id: addIdText,
      id
    }),
      headers: {
      'Content-Type': 'application/json'
    },
   });
  const json = await response.json(); //Obtendo a resposta
  console.log(json);
   alert('Excluido com sucesso');
   window.location.href=('/home');
    
  }

  /* Funcao do click do button */
  const handleCadastrar =  async () => {


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
    
      if(addNameText && addAgeText){
            const response  = await fetch("http://localhost:5000/add", {
            
            method: 'post',
          
            body: JSON.stringify({
              //id: addIdText,
              name:addNameText,
              age:addAgeText
            }),
              headers: {
              'Content-Type': 'application/json'
            },
          });
          const json = await response.json(); //Obtendo a resposta
          console.log(json);
        
      }else{
        alert ("preencha todos os campos");
      }

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


            <>
          

              <div>
                
                <form className={style.form}>
                    <label className={style.tituloCadastro}>Cadastro</label>                          

                    <input type='text'
                    value={addNameText} 
                    placeholder={'insira o nome'}
                    onChange={handleAddNameChange} />
                  <input type='number'
                    value={addAgeText} 
                    placeholder={'insira a idade'}
                    onChange={handleAddAgeChange} 
                    />

                <button className={style.buttonCadastrar} onClick={handleCadastrar}>Cadastrar</button>

               
                
                </form>
              </div> 

              <div className={style.tituloTable}>
                      <h2>Dados do banco</h2>
                  </div> 
              <div>
                  
                                
                        {users.map((item, index)=>(
                            <div key={item.id}>
                            {/*users.length*/}
                                
                            <Table responsive>
                          <thead>
                            <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                            <th>Gerenciamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>  {item.name}</td>
                                <td > {item.age}</td>
                                <td>
                                <button className="btn btn-danger"  onClick={()=>deleteItem(item.id)}>Excluir</button>  
                                <Link to={`/update/${item.id}/${item.age}/${item.name}`}><button className="btn btn-success">Editar</button></Link> 
                            </td>

                                </tr>                            
                            </tbody>
                        </Table>

                           
                            </div>
                            
                        ))}
                         
                        
               
                </div>            
              
            </>
        

      {/* <button onClick={carregar}>Caregar</button> */}
    </div>
  );

 
}