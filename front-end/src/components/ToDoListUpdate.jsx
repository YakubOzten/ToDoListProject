import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ToDoListServiceApi from '../services/ToDoListServiceApi';
import { withTranslation } from 'react-i18next';

function RegisterUpdate({ t, i18n, props }) {

    // REDIRECT
    const navigate = useNavigate();

    // STATE

    const [name, setToDoListName] = useState(null);
    const [isDone, setIsDone] = useState(false);

    // STATE ID
    const [registerId, setToDoListId] = useState(null);

    // PARAMS
    const updateParamsRegisterId = useParams();

    //  ERROR, MULTIPLEREQUEST, READ, SPINNER
    const [error, setError] = useState(undefined);
    const [multipleRequest, setMultipleRequest] = useState(false);
    const [spinner, setSpinner] = useState(false);

    // USE EFFECT
    useEffect(() => {
        // Params ID
        setToDoListId(updateParamsRegisterId.id);
        // FIND
        ToDoListServiceApi.toDoListApiFindById(updateParamsRegisterId.id)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response);
                    setToDoListName(response.data.name)
                    setIsDone(response.data.isDone)
                } else
                    Promise.reject()
            })
            .catch((err) => {
                console.error(err)
            })

        // başlangıçta Hatayı gösterme
        setError(undefined);
        setSpinner(false);
    }, [])

    // FUNCTION



    // OnChange

    const registerNameOnChange = (event) => {
        const { name, value } = event.target;
        //console.log(`${name} => ${value}`);
        setToDoListName(value);

    }



    // onSubmitSearch
    const onSubmitForm = (e) => {
        e.preventDefault();
    }

    //// SUBMIT
    // registerUpdateSubmit
    const registerUpdateSubmit = async (event) => {
        // Register Object
        const registerCreateObject = {
            name
        }
        //console.log(registerCreateObject);

        // Hataları gösterme
        setError(null);

        // Spinner Aktif et
        setSpinner(true);

        // MultipleRequest (Aktif)
        setMultipleRequest(true);

        // API
        try {
            const response = await ToDoListServiceApi.toDoListApiUpdate(updateParamsRegisterId.id, registerCreateObject);
            if (response.status === 200) {
                // Spinner Pasif et
                setSpinner(false);
                // MultipleRequest (Aktif)
                setMultipleRequest(false);
                // Toast Message
                alert("Kayıt Başarılı");
                navigate('/ToDoList/list');
            }
        } catch (err) {
            //console.error(err.response.data.validationErrors);
            setError(err.response.data.validationErrors)
            // Spinner Pasif et
            setSpinner(true);
            // MultipleRequest (Aktif)
            setMultipleRequest(false);
        }
    }

    // Spinner
    const spinnerFunction = () => {
        if (spinner) {
            return (
                <div class="spinner-border  spinner-border-sm text-warning me-2" role="status" >
                </div>
            )
        } else {
            return "";
        }
    }

    //Error
    const classNameData = { error } ? "is-invalid form-control mb-3" : "form-control mb-3";
    //console.log(error);
    //console.log(registerSurname);
    //console.log(classNameData);

    // RETURN
    return (
        <React.Fragment>
            <h1>{t('register_update')}</h1>
            <form onSubmit={onSubmitForm}>
                {/* <form onSubmit="event.preventDefault()"> */}
                <div className="d-grid gap-4">
                    {/* registerName */}
                    <div className="form-group"><label htmlFor="registerName">{t('user_name')}</label>
                        <input
                            type="text"
                            className='form-control'
                            id="name"
                            name="name"
                            placeholder='name'
                            autoFocus={false}
                            required={true}
                            onChange={registerNameOnChange}
                            value={name}
                        />
                        {
                            error ?
                                <div className="alert alert-danger">
                                    {error.name}
                                </div>
                                : ''
                        }
                    </div>


                </div>





                {/* SUBMIT   */}
                <button
                    type='submit'
                    onClick={registerUpdateSubmit}
                    className="btn btn-primary mt-2 me-2"
                    disabled={(!localStorage.getItem("is_read") === true) || (multipleRequest)}>
                    {/* SPINNER */}
                    {
                        spinnerFunction()
                    }
                    {t('submit')}
                </button>
            </form>
        </React.Fragment>
    )
}

// Export i18n Wrapper
export default withTranslation()(RegisterUpdate) 