// React
import React, { Component } from 'react';

// Axios
import axios from 'axios';


// Reuability
import OtherLanguageReusability from '../internationalization/OtherLanguageReusability';

// i18
import { withTranslation } from 'react-i18next';

// Link
import { Link } from 'react-router-dom';

// Web Page Url
import WebPageUrl from './root/WebPageUrl';

// Validation Prop
import PropTypes from 'prop-types'

// Services


// dark mode
import '../dark.css';
import DarkMode from './DarkMode/DarkMode';

// Header Class
class HeaderProject extends Component {

    // Display Name
    static displayName = "Header_Project";

    // CONSTRUCTOR
    constructor(props) {
        super(props);

        // STATE
        this.state = {
            loading: false,
            ToDoNames: [], // Header Search
            searchData: "",
        }

        //BIND (Search)
        this.searchToDoName = this.searchToDoName.bind(this);
        this.searchClearList = this.searchClearList.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
    }

    // CDM

    // Name Find
    searchToDoName(search) {
        this.setState({
            loading: true
        })
        //setTimeOut  (()=>{},1000)
        //setInterval (()=>{},1000)
        setTimeout(() => {

            axios(`http://localhost:8080/ToDoList/api/search?name=${search}`)
                .then((response) => {
                    console.log(response.data);
                    alert(JSON.stringify(response.data, null, 2)); // The third parameter (2) is for indentation
                    this.setState({
                        ToDoNames: response.data.items,
                        loading: false
                    })
                })
                .catch((err) => { console.error(err); })
        }, 1000)
    }

    // Clear List
    searchClearList() {
        this.setState({
            ToDoNames: []
        })
    }

    // onChangeSearch
    // input içine bir şeyler yazdımızda almak için
    onChangeSearch(e) {
        //console.log(e.target.value);
        this.setState({
            searchData: e.target.value
        })
        this.searchToDoName(this.state.searchData);
    }

    // onSubmitSearch
    onSubmitSearch(e) {
        e.preventDefault();
        this.searchToDoName(this.state.searchData);
        // Gönderme işleminden sonra search içindeki veri silinsin
        this.setState({ searchData: "" })
    }


    // jQuery autoComplete
    //     $(function(){
    //         const searchData=["adana","balikesir","ceyhan","diyarbakır","denizli","elazığ","malatya"];
    //    $("#tags").autocomplete({
    //     source:searchData
    //    })
    //     })

    // RENDER
    render() {

        // object destructing
        const { t } = this.props;

        // RETURN
        return (

            <header >
                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <div className="container">
                        {/* Absolute Path */}
                        <a
                            className="navbar-brand"
                            style={{ color: `#${this.props.colorObject}` }}
                            // style={{color:"#"+this.props.colorObject}} 
                            href={this.props.url}>
                            <i className={this.props.logo}></i>
                        </a>

                        <button
                            className="navbar-toggler d-lg-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsibleNavId"
                            aria-controls="collapsibleNavId"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavId">
                            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    {/* Root: relative Path */}
                                    <Link className="nav-link active" to="/"><i className="fa-solid fa-house-chimney"></i> {t('home')} </Link>
                                </li>
                            </ul>

                            {/* Register / Login */}
                            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                                {/* i18n Language */}


                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="dropdownId"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {t('registers')}
                                    </a>

                                    <div className="dropdown-menu" aria-labelledby="dropdownId">
                                        <Link className="dropdown-item" to="/ToDoList/list" >{t('to-do list')} </Link>
                                        <Link className="dropdown-item" to="/ToDoList/create" >{t('todo_Create')} </Link>
                                    </div>
                                </li>

                                {/* Search Form */}
                                <form onSubmit={this.onSubmitSearch} className="d-flex my-2 my-lg-0 ">
                                    <input
                                        type="text"
                                        id="tags"
                                        className="form-control me-sm-2"
                                        value={this.state.searchData}
                                        onChange={this.onChangeSearch}
                                        placeholder={t('search')}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-outline-success my-2 my-sm-0"
                                        onClick={this.searchClearList} >
                                        {t('search')}
                                    </button>
                                </form>

                            </ul>

                            {/* Dark Mode */}
                            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    {/* dark mode */}
                                    <DarkMode />
                                </li>


                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="dropdownId"
                                        data-bs-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        {t('language')}
                                    </a>

                                    <div className="dropdown-menu" aria-labelledby="dropdownId">
                                        <OtherLanguageReusability />
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
                <span style={{ marginBottom: "2rem" }}>.</span>
            </header>
        ); //end return
    } //end render
} //end class

// Default Değerler
HeaderProject.defaultProps = {
    url: WebPageUrl.mySpecialUrl.toString(),
    //url: String(WebPageUrl.mySpecialUrl),
    //url: "http://localhost:3000",
    colorObject: "abcf41"
}

// Default Validation
HeaderProject.propTypes = {
    url: PropTypes.string.isRequired,
    // colorObject: PropTypes.number.isRequired
    colorObject: PropTypes.string.isRequired
}

// Wrapper High Order (i18n)
export default withTranslation()(HeaderProject);