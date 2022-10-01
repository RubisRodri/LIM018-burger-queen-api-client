import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


const token = localStorage.getItem('token')

export const Ordenes = () => {
    const[list, setList] = useState([]);

    const getProducts = async() =>{
        const response = fetch('http://localhost:3001/products', {
            headers: { "authorization":`Bearer ${token}`}
            })
        return response;
    }


      useEffect(() => {
        getProducts().then(response => response.json()) 
              .then(response => setList(response))
              .catch(err => console.log(err))   
               
      },[])
    
      console.log(list)

    return(
        <>
        <div> soy un componente para tomar las ordenes</div>
        {
            list.map((product) =>(
                <h3>{product.name}
                <h3>{product.price}</h3></h3>
            ))
        }        
        </>
    )
};

