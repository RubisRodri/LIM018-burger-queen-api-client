// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Navbar } from '../../Components/navbar/Navbar.jsx';
// import Footer from '../../Components/footer/footer.jsx';
// import { useEffect, useState } from "react";
// import agregar from '../../Pictures/agregar.png'
// import Swal from 'sweetalert2';
// import './employess.css'

// export const Employess = () =>{
//     const navigate = useNavigate();
//     const[employess, setEmployess ] = useState([]);
//     const[users, setUsers] = useState([])

//     const [formValues, setFormValues] = useState({
//         test:'',
//         test2: '',
//         test3: ''
//     })

//     //const [testInputValue, setTestInputValue] = useState('')
//     //const [testInputValue2, setTestInputValue2] = useState('')

//     const handleInputChange = (e) => {
//         const { name, value} = e.target
//         setFormValues((prevState) => { return {...prevState, [name]: value} })
//     }
        
//     const URL ="http://localhost:3001/users?_limit=4"
    
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
//         fetch(`http://localhost:3001/users/${user.id}`, {
//             method: "DELETE",
//             headers: {
//                 "Content-type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem('token')}`
//             },
//         }) .then((response) => response.json())
//            .then(rep => setEmployess(rep))
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
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
//         //crear una variable de estado useState
//         //
//         Swal.fire({
//             title: 'Actualizar información',
//             html:`
//             <form  >
//              <input type="text" value="" className="form-control" placeholter="Nombre">
//              <hr>
//              <input type="text" value=""className="form-control" placeholter="Apellido">
//              <hr>
//              <input type="text" value="" className="form-control" placeholter="E-mail">
//              <hr>
//              <input type="text" value="" className="form-control" placeholter="Cargo">
//             </form>
//             `,
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Aceptar'
//           }).then((result) => {
//             if (result.isConfirmed) {
//               Swal.fire(
//                 'Actualizado!',
//                 'El usuario ha sido actualizado.',
//                 'success'
//               )
//             }
//           })
//         const data = { 
//             "roles": "Chef",
//              "name": "Rubis",
//               "email":"rubisrodri@gmail.com"}
//          fetch(`http://localhost:3001/users/${user.id}`, {
//             method: "PATCH",
//             headers: {
//                 "Content-type": "application/json",
//                 "Authorization": `Bearer ${localStorage.getItem('token')}`
//             },
//             body: JSON.stringify(data)
//         }).then((response) => response.json())
//           .then(rep => console.log(rep))
           
//     }
     
//     const showAddUser = () => {
//         console.log("añadiendo empleado")
       
//     }
//     const handleSubmit = (e) => {
//         e.preventDefault()
//         /*const body = {
//             test: testInputValue,
//             test2: testInputValue2
//         }
//         console.log(body)*/
//         console.log(formValues)
//     }
//     return(
//         <>
//          <Navbar />
//          <div className="contenedor-btn">
//                 <div className='container-btn'>
//                     <button type='button' className='break-btn' onClick= {showProducts}>Productos</button>
//                     <button type='button' className='dinner-btn'>Empleados</button>
//                         <div className="ctn-agregar">
//                             <img className="agregar" onClick={ showAddUser} src={agregar}/>
//                         </div>
//                  </div>   
                   
//                 <div className="contenedor-table">
//                   <table>
//                     <thead>
//                         <tr>
//                             <th>Nombre</th>
//                             <th>Apellido</th>
//                             <th>E-mail</th>
//                             <th>Cargo</th>
//                             <th>Opciones</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {users.length===0?<tr><td colSpan="5">Sin datos</td></tr>:
//                         users.map((user, index) =>{
//                             return(
//                                 <tr key={index}>
//                                      <td>{user.name}</td>
//                                      <td>{user.lastName}</td>
//                                      <td>{user.email}</td>
//                                      <td>{user.roles}</td>
//                                      <td><button onClick={() => updateUser(user)}>Editar</button>{" "}
//                                      <button onClick={() => deleteUser(user)}>Eliminar</button></td>
//                               </tr>
//                             )
//                         })}
//                     </tbody>
//                   </table>
//                 </div>
//              </div>  
//             <form onSubmit={handleSubmit}>
//                 {/* <input name="test" value={testInputValue} onChange={(e) => setTestInputValue(e.target.value)} /> */}
//                 {/* <input name="tes2t" value={testInputValue2} onChange={(e) => setTestInputValue2(e.target.value)} /> */}
//                 <input name="test" value={formValues['test']} onChange={handleInputChange} />
//                 <input name="test2" value={formValues['test2']} onChange={handleInputChange} />
//                 <input name="test3" value={formValues['test3']} onChange={handleInputChange} />
//                 <button type="submit">enviar</button>
//             </form>
//          <Footer />
//       </>
//     )
// }