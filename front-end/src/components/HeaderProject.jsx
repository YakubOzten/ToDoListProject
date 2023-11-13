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
import ToDoListApi from '../services/ToDoListServiceApi';

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
            persons: [], // Header Search
            searchData: "",
        }

        // BIND (Search)
        this.searchPerson = this.searchPerson.bind(this);
        this.searchClearList = this.searchClearList.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
    }

    // CDM
    componentDidMount() {
        // RegisterApi.registerApiList()
        //     .then(
        //         (response) => {
        //             //console.log(response);
        //             //console.log(response.data);
        //             //console.log(response.status);
        //             //console.log(response.headers);
        //             if (response.status === 200) {
        //                 this.setState({
        //                     persons: response.data
        //                 })
        //             }
        //         }
        //     )
        //     .catch((err) => {
        //         console.log(err);
        //     });
    }

    //FUNCTION
    // Person Find
    searchPerson(search) {
        this.setState({
            loading: true
        })
        //setTimeOut  (()=>{},1000)
        //setInterval (()=>{},1000)
        setTimeout(() => {
            axios(`http://localhost:4444/register/api/v1.0.0/search?surname=${search}`)
                .then((response) => {
                    //console.log(response);
                    //console.log(response.data);
                    this.setState({
                        persons: response.data.items,
                        loading: false
                    })
                })
                .catch((err) => { console.error(err); })
        }, 1000)
    }

    // Clear List
    searchClearList() {
        this.setState({
            persons: []
        })
    }

    // onChangeSearch
    // input içine bir şeyler yazdımızda almak için
    onChangeSearch(e) {
        //console.log(e.target.value);
        this.setState({
            searchData: e.target.value
        })
        this.searchPerson(this.state.searchData);
    }

    // onSubmitSearch
    onSubmitSearch(e) {
        e.preventDefault();
        this.searchPerson(this.state.searchData);
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