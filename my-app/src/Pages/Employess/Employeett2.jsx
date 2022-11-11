// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Navbar } from '../../Components/navbar/Navbar.jsx';
// import Footer from '../../Components/footer/footer.jsx';
// import { useEffect, useState } from "react";
// import agregar from '../../Pictures/agregar.png'
// import Swal from 'sweetalert2';
// import './employess.css';
// import lapiz from '../../Pictures/lapiz.png';
// import dump from '../../Pictures/dump.png';

// export const Employess = () =>{
//     const navigate = useNavigate();
//     const[employess, setEmployess ] = useState([]);
//     const[users, setUsers] = useState([]);
    

//     const [formValues, setFormValues] = useState({
//         name:'',
//         lastName: '',
//         email: '',
//         roles: ''
//     })

//     const [testInputValue, setTestInputValue] = useState('')
//     const [testInputValue2, setTestInputValue2] = useState('')

//     const handleInputChange = (e) => {
//         const { name, value} = e.target
//         setFormValues((prevState) => { return {...prevState, [name]: value} })
//     }
        
//     const URL ="http://localhost:3001/users?_limit=6"
    
//     const showData = async () =>{
//         const response = await fetch(URL)
//         const data = await response.json()
//         console.log(data)
//         setUsers(data)
//     }

//     useEffect(() =>{
//         showData()
//     },[employess])

//     const showProducts = () => {
//         navigate("/Admin")
//         console.log("navegando a products")
//     }

//     const deleteUser= (user) => {
//         console.log("hola", user.id)
//         // const filterUser = users.filter(user => user.id !== id)
//         // setUsers(filterUser)
//         fetch(`http://localhost:3001/users/${user.id}`,{
//             method: "DELETE",
//             headers: {
//                 "Content-type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem('token')}`
//             },
//         }) .then((response) => response.json())
//            .then(rep => setEmployess(rep))
//         Swal.fire({
//             title: 'Seguro deseas eliminar?',
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#333fff',
//             confirmButtonText: 'Yes, delete it!',
//             confirmButtonColor: "f84141"
//           }).then((result) => {
//             if (result.isConfirmed) {
//                 Swal.fire(
//                 'Deleted!',
//                 'Your file has been deleted.',
//                 'success'
//               )
//             }
//             console.log("la peticion fue cancelada")
//           })
//     }

//     const updateUser = (user) => {
//        console.log("modif",user)
      
//         const data = { 
//              "name": "ana",
//              "lastName":"maria",
//              "email":"reala@gmail.com",
//              "password":"",
//              "roles": "Jefe",
//              "admin":false
//             }
//          fetch(`http://localhost:3001/users/${user.id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem('token')}`
//             },
//             body: JSON.stringify(data)
//         }).then((response) => response.json())
//           .then(rep => setEmployess(rep))
//           console.log(employess)
           
//     }
     
//     const showAddUser = () => {
//         console.log("añadiendo empleado")
       
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(formValues)
//         let res = fetch('http://localhost:3001/users/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formValues)
//         }).then((response) => response.json())
//           .then(rep => setEmployess(rep))
        
//     }
//     return(
//         <>
//          <Navbar />
//          <div className="contenedor-btn">
//                 <div className='container-btn'>
//                     <button type='button' className='break-btn' onClick= {showProducts}>Productos</button>
//                     <button type='button' className='dinner-btn'>Empleados</button>
//                 </div>   
//           </div>
//           <div className="container-employess">
//                 <table className= "table-employess">
//                     <thead>
//                         <tr>
//                             <th>Nombre</th>
//                             <th>Apellido</th>
//                             <th>E-mail</th>
//                             <th>Cargo</th>
//                             <th>Opciones</th>
//                         </tr>
//                     </thead>

//                      <tbody>
//                         {users.length===0?<tr><td colSpan="5">Sin datos</td></tr>:
//                         users.map((user, index) =>{
//                             return(
//                                 <tr key={index}>
//                                      <td>{user.name}</td>
//                                      <td>{user.lastName}</td>
//                                      <td>{user.email}</td>
//                                      <td>{user.roles}</td>
//                                      <td><button onClick={() => updateUser(user)}>
//                                      <img className="lapiz-edit" src={lapiz}/>
//                                         </button>{" "}
//                                      <button onClick={() => deleteUser(user)}>
//                                      <img className="dump-employess" src={dump}/>
//                                     </button></td>
//                               </tr>
//                             )
//                          })}
//                     </tbody>
//                 </table>
//                   <form className="form-add" onSubmit={handleSubmit}>
//                     <h2>Empleados</h2>
//                       {/* <input name="test" value={testInputValue} onChange={(e) => setTestInputValue(e.target.value)} /> */}
//                       {/* <input name="tes2t" value={testInputValue2} onChange={(e) => setTestInputValue2(e.target.value)} /> */}
//                       <p>Nombre</p>
//                       <input className="input-employess" name="name" value={formValues['test']} onChange={handleInputChange} /> 
//                       <p>Apellido</p>
//                       <input className="input-employess" name="lastName" value={formValues['test2']} onChange={handleInputChange} /> 
//                       <p>E-mail</p>
//                       <input className="input-employess" name="email" value={formValues['test3']} onChange={handleInputChange} />
//                       <p>Cargo</p>
//                       <input className="input-employess" name="roles" value={formValues['test4']} onChange={handleInputChange} />
//                       <button type="submit">Agregar</button>
//                     </form> 


//          </div>
         
            
//         <Footer />
//       </>
//     )
// }