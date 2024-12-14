// import axios from 'axios';
import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";

    const data = {
        fullName,
        email,
        password,
        phone
    }
    return axios.post(URL_BACKEND, data);
    // console.log(">>>> check input",{fullName,email,password,phone});

}


const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";

    const data = {
        _id: _id,
        fullName,
        phone,

    }
    return axios.put(URL_BACKEND, data);
}

const updateUserAvatarAPI = (_id, fullName, phone, avatar) => {
    const URL_BACKEND = "/api/v1/user";

    const data = {
        _id: _id,
        fullName,
        phone,
        avatar

    }
    return axios.put(URL_BACKEND, data);
}
const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;


    return axios.delete(URL_BACKEND);
}

const uploadImage = (file, folder) => {
    const URL_FILE_UPLOAD = "/api/v1/file/upload";

    const config = {
        headers: {
            'upload-type': folder
        },
    };

    var formData = new FormData();
    formData.append('fileImg', file);

    return axios.post(URL_FILE_UPLOAD, formData, config);
}

const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;

    return axios.get(URL_BACKEND);
}



const registerAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";

    const data = {
        fullName,
        email,
        password,
        phone
    }
    return axios.post(URL_BACKEND, data);
    // console.log(">>>> check input",{fullName,email,password,phone});

}

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";

    const data = {
        username: email,
        password,
        delay: 2000
    }
    return axios.post(URL_BACKEND, data);

}
const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";


    return axios.post(URL_BACKEND);

}
const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";

    return axios.get(URL_BACKEND);

}



// Book 
const fetchAllBookAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND)
}



const createBookAPI = (mainText,author,price,quantity,category,thumbnail) => {
    const URL_BACKEND = "/api/v1/book";

    const data = {
        mainText,
        author,
        price,
        quantity,
        category,
        thumbnail,
    }
    return axios.post(URL_BACKEND, data);

}
const updateBookAPI = (_id,mainText,author,price,quantity,category,thumbnail) => {
    const URL_BACKEND = "/api/v1/book";

    const data = {
        _id,
        mainText,
        author,
        price,
        quantity,
        category,
        thumbnail,
    }
    return axios.put(URL_BACKEND, data);

}


const deleteBookAPI = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`;


    return axios.delete(URL_BACKEND);
}
export {
    createUserAPI,
    updateUserAPI,
    updateUserAvatarAPI,
    uploadImage,
    fetchAllUserAPI,
    deleteUserAPI,
    registerAPI,
    loginAPI,
    getAccountAPI,
    logoutAPI,
    fetchAllBookAPI,
    createBookAPI,
    updateBookAPI,
    deleteBookAPI
}
