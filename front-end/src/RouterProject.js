// rfce
// React
import React from 'react'

//Router
import { Navigate, Route, Routes } from 'react-router-dom'



// ToDoList
import ToDoListCreate from './components/ToDoListCreate'
import ToDoList from './components/ToDoList'
import ToDoListUpdate from './components/ToDoListUpdate'
import ToDoListDelete from './components/ToDoListDelete'
import ToDoListFind from './components/ToDoListFind'
import MainPage from './components/MainPage'
import HeaderProject from './components/HeaderProject'


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
                    <Route path="/" element={<MainPage />} />
                    <Route path="/index" element={<MainPage />} />

                    {/* LOGIN */}
                    {/* <Route path="/login" element={<Login />} /> */}

                    {/* REGISTER */}
                    <Route path="/ToDoList/create" element={<ToDoListCreate />} />
                    <Route path="/ToDoList/list" element={<ToDoList />} />
                    <Route path="/register/view/:id" element={<ToDoListFind />} />
                    <Route path="/register/update/:id" element={<ToDoListUpdate />} />
                    <Route path="/register/delete/:id" element={<ToDoListDelete />} />

                    {/* USER PAGE
                    <Route path="/user" element={<User />} /> */}

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