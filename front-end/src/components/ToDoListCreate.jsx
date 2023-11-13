
import React, { useState } from 'react'
import { withTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'
import ToDoListServiceApi from '../services/ToDoListServiceApi';



// inputlar doldurlmadığında button aktifleştirilmesin
// tarihe bak



// FUNCTION REGISTER
function RegisterCreate({ t, i18n, props }) {



    // REDIRECT
    const navigate = useNavigate();

    // STATE
    const [name, setToDoListName] = useState(null);
    const [isDone, setIsDone] = useState(false);

    //  ERROR, MULTIPLEREQUEST, READ, SPINNER
    const [error, setError] = useState(undefined);
    const [multipleRequest, setMultipleRequest] = useState(false);
    const [spinner, setSpinner] = useState(false);


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
    // registerCreateSubmit
    const registerCreateSubmit = async (event) => {
        // Register Object
        const registerCreateObject = {
            name,
            // registerName,
            // registerSurname,
            // registerEmail,
            // registerPassword,
            isDone,
        }
        // Hataları gösterme
        setError(null);

        // Spinner Aktif et
        setSpinner(true);

        // MultipleRequest (Aktif)
        setMultipleRequest(true);

        // API
        try {
            const response = await ToDoListServiceApi.toDoListApiCreate(registerCreateObject);
            if (response.status === 200) {
                // Spinner Pasif et
                setSpinner(false);
                // MultipleRequest (Aktif)
                setMultipleRequest(false);
                // Toast Message
                alert("Kayıt Başarılı");
                //navigate('/register/list');
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
                <div className="spinner-border  spinner-border-sm text-warning me-2" role="status" >
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
            <h1 className="mt-5">{t('todo_Create')}</h1>
            <form onSubmit={onSubmitForm}>
                {/* <form onSubmit="event.preventDefault()"> */}
                <div className="d-grid gap-4">

                    {/* ToDoList Name */}
                    <div className="form-group"><label htmlFor="ToDoListName">{t('ToDoListName')}</label>
                        <input
                            type="text"
                            className={classNameData}
                            id="name"
                            name="name"
                            placeholder='ToDoListName'
                            autoFocus={false}
                            required={true}
                            onChange={registerNameOnChange}
                        />
                        {
                            error ?
                                <div className="invalid-feedback">{error.name}</div>
                                : ''
                        }
                        {/* <div className="form-group"><label htmlFor="ToDoListisDone">{t('is_Done')}</label>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                onChange={onChangeIsRead}
                                name="isDone"
                                id="isDone" />
                            {
                                error ?
                                    <div className="invalid-feedback">{error.name}</div>
                                    : ''
                            }
                        </div> */}
                        {/* is_Done */}
                    </div>

                </div>
                {/* SUBMIT   */}
                <button
                    type='submit'
                    onClick={registerCreateSubmit}
                    className="btn btn-primary mt-2 me-2"
                    // disabled={ !loginObjectisNull|| (!localStorage.getItem("is_read") == true) || (multipleRequest)}>
                    disabled={(!localStorage.getItem("is_read") === true) || (multipleRequest)}>
                    {/* SPINNER */}
                    {
                        spinnerFunction()
                    }
                    {t('Save')}
                </button>
            </form>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </React.Fragment>
    )
}

// Export i18n Wrapper
export default withTranslation()(RegisterCreate);


// function ToDoListCreate() {
//     return (
//         <Card>
//             <Card.Header>ToDoInput</Card.Header>
//             <Card.Body>
//                 {/* <Card.Title>Special title treatment</Card.Title> */}
//                 <input className='form-control' placeholder='New ToDo'></input>
//                 {/* <Card.Text>
//             With supporting text below as a natural lead-in to additional content.
//         </Card.Text> */}
//                 <br></br>
//                 <Button className='form-control' variant="primary">Add new task</Button>
//             </Card.Body>
//         </Card>
//     )
// }

// // Export i18n Wrapper
// export default withTranslation()(RegisterCreate);