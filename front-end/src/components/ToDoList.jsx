// React
import React, { useEffect, useState } from 'react'

// REDIRECT (useNavigate)
import { Link, useNavigate } from 'react-router-dom'
import ToDoListServiceApi from '../services/ToDoListServiceApi';
import { withTranslation } from 'react-i18next';

import './ToDoList.css';





// Function ToDo List
function ToDoList({ t, i18n, props }) {




    // REDIRECT
    let navigate = useNavigate();

    // STATE
    const [ToDoListApi, setToDoListApi] = useState([]);

    // EFFECT
    useEffect(() => {
        fetchToDoList();
    }, []) //end useEffect

    // for Effect Function
    const fetchToDoList = async () => {
        try {
            const response = await ToDoListServiceApi.toDoListApiList();
            if (response.status === 200) {
                //console.log(response);
                response.data = response.data.sort((a, b) => new Date(a.id) - new Date(b.id));
                setToDoListApi(response.data)
            }

        } catch (err) {
            console.error(err);
        }
    } //end fetchToDoList

    // LIST AFTER LOADING
    const listManipulationAfter = () => {
        ToDoListServiceApi.toDoListApiList()
            .then(
                (response) => {


                    //console.log(response);
                    // console.log(response.data);
                    //console.log(response.status);
                    //console.log(response.headers);
                    if (response.status === 200) {
                        response.data = response.data.sort((a, b) => new Date(a.id) - new Date(b.id));
                        setToDoListApi(response.data)

                    }
                }
            )
            .catch((err) => {
                console.log(err);
            });
    }

    // SPEED DATA
    const speedData = async () => {
        const userData = prompt("Kaç tane veri eklemek istiyor sunuz ?")
        let response = await ToDoListServiceApi.toDoListApiSpeedData(userData);
        if (response.status === 200) {
            console.log("Speed Data");
            listManipulationAfter();
            navigate('/ToDoList/list')
            //window.location="/ToDo/list"
        }
    }

    // DELETE ALL
    const deleteAll = () => {
        if (window.confirm("Bütün verileri silmek istiyor musunuz ?")) {
            // Promise
            ToDoListServiceApi.toDoListApiDeleteAll()
                .then((response) => {
                    if (response.status === 200) {
                        listManipulationAfter();
                        //navigate('/ToDoList/list')
                        window.location = "/ToDoList/list"
                    }
                })
                .catch((err) => { console.log(err); })
        } else {
            alert("Silinmedi")
        }
    }

    ////////////////////////////
    // CRUD
    // ToDo UPDATE
    const setUpdateToDo = (data) => {
        // 1.YOL (id useParams)
        // 2.YOL (localStorage)
        let { id, name, isDone } = data
        localStorage.setItem("ToDo_update_id", id)
        localStorage.setItem("ToDo_update_name", name)
        localStorage.setItem("ToDo_update_is_done", isDone)
    }

    // ToDo VIEW
    const setViewToDo = (id) => {
        // 1.YOL (id useParams)
        // 2.YOL (localStorage)
        localStorage.setItem("ToDo_view_id", id)
    }

    //ToDo DELETE
    const setDeleteToDo = (id) => {
        if (window.confirm(id + " silmek istiyor musunuz ?")) {
            // 1.YOL
            ToDoListServiceApi.toDoListApiDeleteById(id)
                .then((response) => {
                    if (response.status === 200) {
                        listManipulationAfter();
                        navigate('/ToDoList/list')
                    }
                })
                .catch((err) => {
                    console.error(err);
                    navigate('/ToDoList/list')
                });
        } else {
            alert(id + " nolu data silinmedi !!!");
            //navigate('/ToDo/list')
            window.location = "/ToDoList/list"
        }




        // 2.YOL (delete axios yazarak)
        // axios.delete(" http://localhost:4444/ToDo/api/v1.0.0/delete/"+id).then().catch();
    }

    // RETURN
    return (
        <React.Fragment>
            <br /><br />
            <h1>{t('to-do list')}</h1>
            <Link className='btn btn-primary me-2' to="/ToDoList/create">{t('create')}</Link>
            <Link className='btn btn-secondary me-2' onClick={speedData}>{t('create_all')}</Link>
            <Link className='btn btn-danger' onClick={deleteAll}>{t('delete_all')}</Link>
            <table className='table table-striped table-responsive mb-5'>
                <thead>
                    <tr>
                        <th>{t('id')}</th>
                        <th>{t('ToDoListName')}</th>
                        <th>{t('Is_done')}</th>
                        <th>{t('system_date')}</th>
                        <th>{t('update')}</th>
                        <th>{t('show')}</th>
                        <th>{t('delete')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ToDoListApi.map((response) =>
                            <tr key={response.id} className={response.isDone ? 'done-row' : 'undone-row'}>
                                <td>   {response.id}  </td>
                                <td> {response.name} </td>
                                <td>{response.isDone ? "✅Evet" : "⛔️Hayır"}</td>
                                <td> {response.systemDate} </td>
                                <td>
                                    <Link to={`/ToDo/update/${response.id}`}>
                                        <i onClick={() => setUpdateToDo(response)} className="fa-solid fa-pen-nib text-primary"></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/ToDo/view/${response.id}`}>
                                        <i onClick={() => setViewToDo(response.id)} className="fa-solid fa-eye text-secondary"></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link>
                                        <i onClick={() => setDeleteToDo(response.id)} className="fa-solid fa-trash text-danger"></i>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot></tfoot>
            </table >



        </React.Fragment >
    ) //end return
} //end function ToDoList

// EXPORT 
export default withTranslation()(ToDoList) 