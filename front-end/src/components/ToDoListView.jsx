// React, useState
import React, { useEffect, useState } from 'react'

// i18n
import { withTranslation } from 'react-i18next'

// Router, Params
import { useNavigate, useParams } from 'react-router-dom'

//api
import ToDoListServiceApi from '../services/ToDoListServiceApi';

// Image
import sunrise from '../image/sunrise.jpg';

// toDo VIEW FUNCTION
function ToDoListView({ props, t, i18n }) {

    // REDIRECT
    let navigate = useNavigate();

    // STATE
    const [id, setId] = useState(null);
    const [toDoViewState, settoDoViewState] = useState([]);

    // PARAMS (ID)
    const parametersHandlingViewId = useParams();

    // EFFECT
    useEffect(() => {
        // 1.YOL LocalStorage
        setId(localStorage.getItem("toDo_view_id"))

        // 2.YOL useParams
        setId(parametersHandlingViewId.id);

        //FIND BY ID
        ToDoListServiceApi.toDoListApiFindById(parametersHandlingViewId.id)
            //oDolistApi.toDoApiFindById(localStorage.getItem("toDo_view_id")) //2.YOL
            .then((response) => {
                console.log(response);
                // console.log(response.data);
                // console.log(response.status);
                // console.log(response.headers);
                if (response.status === 200) {
                    settoDoViewState(response.data);
                }

            })
            .catch((err) => {
                console.error(err);
            });
    }, []); //end useEffect

    // RETURN
    return (
        <React.Fragment>
            <h1 className="text-center display-3">{t('to-do-view-show')}</h1>
            <div className="card">
                {/* <img className="card-img-top" src={sunrise} alt="Title" /> */}
                <div className="card-body">
                    <h4 className="card-title">Id: {toDoViewState.id}</h4>
                    <p className="card-text">Konu:{toDoViewState.name}</p>
                    <p className="card-text">Yapıldı mı ?{toDoViewState.isDone ? "✅Evet" : "⛔️Hayır"}</p>
                    <br /><br /><br /><br /><br /><br />
                </div>
            </div>

        </React.Fragment>
    )// end return
} //end toDoView


// EXPORT
export default withTranslation()(ToDoListView)