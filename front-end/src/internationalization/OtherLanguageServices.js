import axios from "axios";


//Language
class OtherLanguageServices {

    // language Flag button
    headerLanguageServices(language) {
        axios.defaults.headers['accept-language'] = language;
    }
}

export default new OtherLanguageServices()

// const otherLanguageServices = function () {
//     // language Flag button
//     headerLanguageServices(language) {
//         axios.defaults.headers['accept-language'] = language;
//     }

// };
// export default otherLanguageServices;
// class OtherLanguageServices {

//     // // language Flag button
//     // headerLanguageServices(language) {
//     //     axios.defaults.headers['accept-language'] = language;
//     // }
// }

// export default new OtherLanguageServices()