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

const updateUserAvatarAPI = (_id,fullName, phone, avatar) => {
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

const uploadImage = (file,folder) => {
    const URL_FILE_UPLOAD = "/api/v1/file/upload";

    const config = {
        headers: {
          'upload-type': folder
        },
      };

    var formData = new FormData();
    formData.append('fileImg', file); 
   
    return axios.post(URL_FILE_UPLOAD,formData,config);
}

const fetchAllUserAPI = (current,pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;

    return axios.get(URL_BACKEND);
}
export {
    createUserAPI,
    updateUserAPI,
    updateUserAvatarAPI,
    uploadImage,
    fetchAllUserAPI,
    deleteUserAPI
}
