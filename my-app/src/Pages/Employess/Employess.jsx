import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../Components/navbar/Navbar.jsx';
import Footer from '../../Components/footer/footer.jsx';
import { useEffect, useState } from "react";
import agregar from '../../Pictures/agregar.png'
import Swal from 'sweetalert2';
import './employess.css';
import lapiz from '../../Pictures/lapiz.png';
import dump from '../../Pictures/dump.png';

export const Employess = () =>{
    const navigate = useNavigate();
    const[employess, setEmployess ] = useState([]);
    const[users, setUsers] = useState([]);
    const[name, setName] = useState([]);
    const[lastName, setLastname] = useState([]);
    const[email, setEmail] = useState([]);
    const[roles, setRoles] = useState ([]);
    const[validacionModificar, setValidacionModificar] = useState(false);
    const[idModificar, setIdModificar] = useState(0);

    const URL ="http://localhost:3001/users?_limit=6"
    
    const showData = async () =>{
        const response = await fetch(URL)
        const data = await response.json()
        console.log(data)
        setUsers(data)
    }

    useEffect(() =>{
        showData()
    },[employess])

    const showProducts = () => {
        navigate("/Admin")
        console.log("navegando a products")
    }

    const deleteUser= (user) => {
        fetch(`http://localhost:3001/users/${user.id}`,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        }) .then((response) => response.json())
           .then(rep => setEmployess(rep))
        Swal.fire({
            title: 'Seguro deseas eliminar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f84141',
            cancelButtonColor: '#333fff',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: "#f84141"
          })
    }

    const updateUser = async(user) => {
       const respuesta = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json;charset=UTF-8",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        }).then(response => response.json())
          .then((value) => {
            setName(value.name)
            setLastname(value.lastName)
            setEmail(value.email)
            setRoles(value.roles)
            setValidacionModificar(true)
            setIdModificar(user.id)
            clearForm()
        })
        
    }

    const editUser = (e) => {
      e.preventDefault()
         fetch(`http://localhost:3001/users/${idModificar}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name,
                lastName,
                email,
                roles,
        })
        }).then((response) => response.json())
          .then(rep => setEmployess(rep))
          console.log(employess)
          setValidacionModificar(false)
          
    }

    const clearForm = () => {
        setEmployess("")
    }
           

    const handleSubmit = (e) => {
        e.preventDefault();
        let res = fetch('http://localhost:3001/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name,
                lastName,
                email,
                roles,
        })
        }).then((response) => response.json())
          .then(reponse => setEmployess(reponse))
        
        
    }

    return(
        <>
         <Navbar />
         <div className="contenedor-btn">
                <div className='container-btn'>
                    
                </div>   
          </div>
          <div className="container-employess">
                <table className= "table-employess">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>E-mail</th>
                            <th>Cargo</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>

                     <tbody>
                        {users.length===0?<tr><td colSpan="5">Sin datos</td></tr>:
                        users.map((user, index) =>{
                            return(
                                <tr key={index}>
                                     <td>{user.name}</td>
                                     <td>{user.lastName}</td>
                                     <td>{user.email}</td>
                                     <td>{user.roles}</td>
                                     <td><button onClick={() => updateUser(user)}>
                                     <img className="lapiz-edit" src={lapiz}/>
                                        </button>{" "}
                                     <button onClick={() => deleteUser(user)}>
                                     <img className="dump-employess" src={dump}/>
                                    </button></td>
                              </tr>
                            )
                         })}
                    </tbody>
                </table>
                  <form className="form-add" onChange={clearForm}>
                    <h2>Empleados</h2>
                    
                      <p>Nombre</p>
                      <input className="input-employess" name="name" onChange={(e) => setName(e.target.value)} value={name} /> 
                      <p>Apellido</p>
                      <input className="input-employess" name="lastName" onChange = {(e) => setLastname(e.target.value)} value={lastName} /> 
                      <p>E-mail</p>
                      <input className="input-employess" name="email" onChange = {(e) => setEmail(e.target.value)} value={email}/>
                      <p>Cargo</p>
                      <input className="input-employess" name="roles" onChange = {(e) => setRoles(e.target.value)} value={roles}/>
                      {validacionModificar? (
                      <button type="submit" className="button-modificar"onClick={(e) => editUser(e)}>Modificar</button>
                      ):(
                      <button type="submit" className="button-eliminar"onClick={(e) => handleSubmit(e)}>Agregar</button>
                      )}
                      
                    </form> 


         </div>
         
            
        <Footer />
      </>
    )
}