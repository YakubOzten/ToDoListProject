// rfce
// React
import React from 'react'

//Router
import { Navigate, Route, Routes } from 'react-router-dom'



// ToDoList
import ToDoListCreate from './components/ToDoListCreate'
import ToDoList from './components/ToDoList'
import ToDoListUpdate from './components/ToDoListUpdate'
import HeaderProject from './components/HeaderProject'
import ToDoListView from './components/ToDoListView'


// FUNCTION COMPONENT
function RouterProject() {

    // RETURN
    return (
        <React.Fragment>
            {/* <HeaderProject logo="" /> */}
            <HeaderProject logo="fa-solid fa-cloud"></HeaderProject>

            <div className="container mt-5 App-header">
                <Routes>

                    {/* ROOT */}
                    <Route path="/" element={<ToDoList />} />


                    {/* LOGIN */}
                    {/* <Route path="/login" element={<Login />} /> */}

                    {/* REGISTER */}
                    <Route path="/ToDoList/create" element={<ToDoListCreate />} />
                    <Route path="/ToDoList/list" element={<ToDoList />} />
                    <Route path="/ToDo/view/:id" element={<ToDoListView />} />
                    <Route path="/ToDo/update/:id" element={<ToDoListUpdate />} />

                    {/* Bad request */}
                    <Route path={"*"} element={<Navigate to={"/"} />} />

                </Routes>
            </div>

            {/* <FooterProject copy="&copy; Bütün Haklar saklıdır." /> */}
        </React.Fragment>
    ) //end return
} // end function 


// EXPORT
export default RouterProject