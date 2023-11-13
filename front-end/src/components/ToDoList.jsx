// React
import React, { useEffect, useState } from 'react'

// REDIRECT (useNavigate)
import { Link, useNavigate } from 'react-router-dom'
import ToDoListServiceApi from '../services/ToDoListServiceApi';
import { withTranslation } from 'react-i18next';





// Function Register List
function RegisterList({ t, i18n, props }) {




    // REDIRECT
    let navigate = useNavigate();

    // STATE
    const [registerListApi, setRegisterListApi] = useState([]);

    // EFFECT
    useEffect(() => {
        fetchRegisterList();
    }, []) //end useEffect

    // for Effect Function
    const fetchRegisterList = async () => {
        try {
            const response = await ToDoListServiceApi.toDoListApiList();
            if (response.status === 200) {
                //console.log(response);
                setRegisterListApi(response.data)
            }

        } catch (err) {
            console.error(err);
        }
    } //end fetchRegisterList

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
                        setRegisterListApi(response.data)
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
            //window.location="/register/list"
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
                        //navigate('/register/list')
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
    // REGISTER UPDATE
    const setUpdateRegister = (data) => {
        // 1.YOL (id useParams)
        // 2.YOL (localStorage)
        let { id, name, isDone } = data
        localStorage.setItem("register_update_id", id)
        localStorage.setItem("register_update_name", name)
        localStorage.setItem("register_update_is_done", isDone)
    }

    // REGISTER VIEW
    const setViewRegister = (id) => {
        // 1.YOL (id useParams)
        // 2.YOL (localStorage)
        localStorage.setItem("register_view_id", id)
    }

    //REGISTER DELETE
    const setDeleteRegister = (id) => {
        if (window.confirm(id + " silmek istiyor musunuz ?")) {
            // 1.YOL
            ToDoListServiceApi.toDoListApiDeleteById(id)
                .then((response) => {
                    if (response.status === 200) {
                        listManipulationAfter();
                        navigate('/ToDoList/list')
                        //window.location = "/register/list"
                    }
                })
                .catch((err) => {
                    console.error(err);
                    navigate('/ToDoList/list')
                    //window.location = "/register/list"
                });
        } else {
            alert(id + " nolu data silinmedi !!!");
            //navigate('/register/list')
            window.location = "/ToDoList/list"
        }




        // 2.YOL (delete axios yazarak)
        // axios.delete(" http://localhost:4444/register/api/v1.0.0/delete/"+id).then().catch();
    }

    // RETURN
    return (
        <React.Fragment>
            <br /><br />
            <h1>{t('register_list')}</h1>
            <Link className='btn btn-primary me-2' to="/ToDoList/create">{t('create')}</Link>
            <Link className='btn btn-secondary me-2' onClick={speedData}>{t('create_all')}</Link>
            <Link className='btn btn-danger' onClick={deleteAll}>{t('delete_all')}</Link>
            <table className='table table-striped table-responsive mb-5'>
                <thead>
                    <tr>
                        <th>{t('id')}</th>
                        <th>{t('Name')}</th>
                        <th>{t('is_done')}</th>
                        <th>{t('system_date')}</th>
                        <th>{t('update')}</th>
                        <th>{t('show')}</th>
                        <th>{t('delete')}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        registerListApi.map((response) =>
                            <tr key={response.id}>
                                <td>{response.id}</td>
                                <td>{response.name}</td>
                                <td>{response.isDone ? "Kullanıcı Aktif" : "Kullanıcı Pasif"}</td>
                                <td>{response.systemDate}</td>
                                <td>
                                    <Link to={`/register/update/${response.id}`}>
                                        <i onClick={() => setUpdateRegister(response)} className="fa-solid fa-pen-nib text-primary"></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link to={`/register/view/${response.id}`}>
                                        <i onClick={() => setViewRegister(response.id)} className="fa-solid fa-eye text-secondary"></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link>
                                        <i onClick={() => setDeleteRegister(response.id)} className="fa-solid fa-trash text-danger"></i>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
                <tfoot></tfoot>
            </table>



        </React.Fragment>
    ) //end return
} //end function RegisterList

// EXPORT 
export default withTranslation()(RegisterList) 