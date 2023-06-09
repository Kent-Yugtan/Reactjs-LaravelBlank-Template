const date = new Date();
const key = `reactreactreact-${date.getFullYear()}`;
const encryptor = require("simple-encryptor")(key);
// const apiUrl = `http://localhost:8000/`;
const apiUrl = `${
    window.location.origin === "http://localhost:3000"
        ? "http://localhost:8000"
        : window.location.origin
}/`;
const apiKey = process.env.MIX_APP_KEY;
const logo = apiUrl + process.env.MIX_APP_LOGO;

const token = () => {
    if (localStorage.token === null) {
        localStorage.token = "";
        return apiKey;
    }
    return "Bearer " + localStorage.token;
};

const userData = () => {
    if (encryptor.decrypt(localStorage.userdata) === null) {
        localStorage.userdata = "";
        return false;
    }
    return encryptor.decrypt(localStorage.userdata);
};

// const extractUserImage = () => {
//     if (encryptor.decrypt(localStorage.userdata) === null) {
//         localStorage.userdata = "";
//         return false;
//     }
//     return encryptor.decrypt(localStorage.userdata).userImage;
// };

// const userImage = () => {
//     let file_path = defaultImage;

//     if (extractUserImage()) {
//         if (
//             extractUserImage().attachments &&
//             extractUserImage().attachments.length !== 0
//         ) {
//             file_path =
//                 apiUrl +
//                 extractUserImage().attachments.filter(
//                     (item) => item.file_description === "UserImage"
//                 )[0].file_path;
//         } else {
//             if (
//                 extractUserImage().client &&
//                 extractUserImage().client.length !== 0
//             ) {
//                 if (
//                     extractUserImage().client.attachments &&
//                     extractUserImage().client.attachments.length !== 0
//                 ) {
//                     file_path =
//                         apiUrl +
//                         extractUserImage().client.attachments.filter(
//                             (item) => item.file_description === "ClientImage"
//                         )[0].file_path;
//                 }
//             }
//         }
//     }

//     return file_path;
// };

const userRole = () => {
    if (userData()) {
        return userData().role;
    }
    return "";
};

export default function companyInfo() {
    return {
        date,
        key,
        apiUrl,
        apiKey,
        name: process.env.MIX_APP_NAME,
        description: process.env.MIX_APP_DESCRIPTION,
        logo,
        encryptor,
        token: token(),
        userData: userData(),
        userRole: userRole(),
        // userImage: userImage(),
    };
}
// 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
