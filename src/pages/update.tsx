import { useState, useEffect,ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from "yup";

import ReactDOM from "react-dom";
import { useFormik } from "formik";
import style from '../style.module.css';

export const Update = () => {

    //parametros da URL
    const { id,age,name} = useParams();


  const formik = useFormik({
    initialValues: {
      nome: name,
      idade: age,
    },
    validationSchema: yup.object({
      nome: yup.string().required("O campo é obrigatório."),
      /*
      email: yup
        .string()
        .email("E-mail inválido.")
        .required("O campo é obrigatório."),
        */
      idade: yup
        .number()
        .required("O campo é obrigatório.")
        .positive("O campo deve ser positivo.")
        .integer("O campo deve ser um número inteiro."),
    }),
    onSubmit: (values) => {
        
        //Função que chama a api para enviar os dados
   const UpdateItem = async () => {
   
    const response  = await fetch(`http://localhost:5000/update/${id}`, {
        
    method: 'put',
  
    body: JSON.stringify({            
      age:values.idade,
      name:values.nome
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

        UpdateItem();

        console.log(values.idade);
    },
  });


   


  return (
    <div>
      
            <form onSubmit={formik.handleSubmit}>
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nome}
            />
            {formik.touched.nome && formik.errors.nome ? (
              <div>{formik.errors.nome}</div>
            ) : null}
            {/*
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            */}
            <label htmlFor="idade">Idade</label>
            <input
              id="idade"
              name="idade"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.idade}
            />
            {formik.touched.idade && formik.errors.idade ? (
              <div>{formik.errors.idade}</div>
            ) : null}
            <button type="submit">Enviar</button>
          </form> 


    </div>
  );
}

